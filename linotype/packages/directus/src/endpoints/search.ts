
export default (router: any, { services }: any) => {
	
  const { ItemsService } = services

  router.post('/search', async (req: any, res: any) => {

    const env = req?.body?.env || 'local'
    const domain = req?.body?.domain || 'localhost'
    const search = req?.body?.search || ''

    if ( search ) {
      const pages = await new ItemsService('linotype_pages', { schema: req.schema, accountability: req.accountability }).readByQuery({
        search: search,
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
    } else {
      res.send([])
    }
    
  })

}