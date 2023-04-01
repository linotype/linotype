import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import fetch from 'node-fetch'
import { merge, omitBy, isNil } from 'lodash-es'

export default (router: any, { services }: any) => {
	
  const { ItemsService } = services

  router.post('/menu', async (req: any, res: any) => {

    const env = req?.body?.env || 'local'
    const domain = req?.body?.domain || 'localhost'

    const pages = await new ItemsService('linotype_pages', { schema: req.schema, accountability: req.accountability }).readByQuery({
      fields: ['title','slug'],
      filter: {
        status: 'published',
        target: {
          ['domain_' + env]: { _eq: domain || 'localhost' },
        },
      },
      limit: -1,
    })

    res.send(pages)
  })

}