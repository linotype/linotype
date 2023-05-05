
export default (router: any, { services }: any) => {
	
  const { ItemsService } = services

  router.get('/search', async (req: any, res: any) => {

    const env = req?.query?.env || 'local'
    const domain = req?.query?.domain || 'localhost'
    const search = req?.query?.search || ''

    if ( search ) {
      const pages = await new ItemsService('linotype_pages', { schema: req.schema, accountability: req.accountability }).readByQuery({
        search: search,
        fields: ['title','slug'],
        filter: {
          status: 'published',
          target: {
            ['domain_' + env]: { _eq: domain || 'localhost' },
          },
          slug: {
            '_ncontains': ':' //exclude dynamic slug
          }
        },
        limit: -1,
      })
      res.send(pages)
    } else {
      res.send([])
    }
    
  })

}