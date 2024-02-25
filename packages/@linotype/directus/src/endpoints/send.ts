import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { Liquid } from 'liquidjs';

export default (router: any, { services }: any) => {

  const { MailService, ItemsService } = services;

  let transporter: Transporter;

  //[POST] send message endpoint
  router.post('/send', async (req: any, res: any) => {

    //get targeted form id
    const form_id = req?.body?.form

    // check if form defined
    if (!form_id) res.status(400).send({ message: 'Form ID not founded' })

    // get form data
    const linotype_inbox_forms = await new ItemsService('linotype_inbox_forms', { schema: req.schema }).readByQuery({
      fields: [
        'id',
        'reference',
        'email_to',
        'subject',
        'fields',
        'template',
        'message_success',
        'message_error',
        'mailer.*'
      ],
      filter: {
        id: form_id
      },
      limit: -1,
    })

    //format form data
    const form = linotype_inbox_forms[0] || null

    // check if form data exist
    if (!form) res.status(400).send({ message: 'Form Data not founded' })


    //render template
    const html = await new Liquid().parseAndRender(form?.template, {
      from: form.mailer?.email,
      to: form.email_to,
      subject: req?.body?.subject || form?.subject || 'contact',
      form: req?.body?.form,
      message: req?.body?.message,
      data: Object.keys(req?.body?.data).map((key: string) => { return { key: key, value: req?.body?.data[key] } }),
      ...req?.body?.data
    });

    //create mail object
    const mailObject = {
      from: form?.mailer?.email,
      to: form?.email_to,
      subject: req?.body?.subject || form?.subject || 'contact',
      html: html
    }

    try {

      let response

      //check if mailer exist
      if (form?.mailer) {

        //create custom mail transporter
        switch (form?.mailer?.type) {
          case 'smtp':
            transporter = nodemailer.createTransport({
              name: form?.mailer?.name,
              host: form?.mailer?.host,
              port: form?.mailer?.port,
              secure: form?.mailer?.secure,
              auth: {
                user: form?.mailer?.user,
                pass: form?.mailer?.password,
              },
              tls: form?.mailer?.tls,
            } as Record<string, unknown>);
            break;
        }

        //send
        response = await transporter.sendMail(mailObject);

      } else {

        //or use the global mailer from directus
        response = await MailService.send(mailObject);

      }

      //log success message in database
      await new ItemsService('linotype_inbox_messages', { schema: req.schema }).createOne({
        status: response ? 'success' : 'error',
        from: form.mailer?.email,
        to: form.email_to,
        subject: req?.body?.subject || form?.subject || 'contact',
        form: req?.body?.form,
        message: req?.body?.message,
        data: Object.keys(req?.body?.data).map((key: string) => { return { key: key, value: req?.body?.data[key] } }),
      })

      //return success
      res.status(200).send({
        message: response ? form.message_success || 'message send' : form.message_error || 'message not send',
      })

    } catch (error) {

      //log error message in database
      await new ItemsService('linotype_inbox_messages', { schema: req.schema }).createOne({
        status: 'error',
        from: form?.mailer?.email,
        to: form?.email_to,
        subject: req?.body?.subject || form?.subject || 'contact',
        form: req?.body?.form,
        message: req?.body?.message,
        data: Object.keys(req?.body?.data).map((key: string) => { return { key: key, value: req?.body?.data[key] } }),
      })

      //return error
      res.status(400).send({
        message: form.message_error || 'message not send',
      })

    }

  })

}
