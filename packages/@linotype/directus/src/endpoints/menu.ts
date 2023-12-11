export default (router: any, { services }: any) => {
	
  const { ItemsService } = services

  router.get('/menu', async (req: any, res: any) => {

    const env = req?.query?.env || ''
    const domain = req?.query?.domain || ''

    const pages = await new ItemsService('linotype_pages', { schema: req.schema, accountability: req.accountability }).readByQuery({
      fields: ['title','slug'],
      filter: {
        status: 'published',
        target: {
          ['domain_' + env]: { _eq: domain },
        },
        slug: {
          '_ncontains': ':' //exclude dynamic slug
        }
      },
      limit: -1,
    })

    res.send(pages)
  })

}