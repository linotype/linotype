
export default (router: any, { services }: any) => {
	
  const { ItemsService } = services

  router.get('/sitemap', async (req: any, res: any) => {

    const env = req?.query?.env || 'local'
    const domain = req?.query?.domain || 'localhost'

    const sitemap = await new ItemsService('linotype_pages', { schema: req.schema, accountability: req.accountability }).readByQuery({
      fields: [
        'slug',
        'sitemap_enable',
        'sitemap_priority',
        'sitemap_changefreq',
      ],
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

    const links = sitemap.map((item: any) => {
      return item.sitemap_enable
        ? {
            url: item.slug,
            changefreq: item.sitemap_changefreq,
            priority: +item.sitemap_priority,
          }
        : null
    })

    res.send(links)
  })

}
