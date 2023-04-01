import { merge, omitBy, isNil } from 'lodash-es'

export default (router: any, { services }: any) => {
	
  const { ItemsService } = services

  router.post('/template', async (req: any, res: any) => {

    const env = req?.body?.env || 'local'
    const domain = req?.body?.domain || 'localhost'
    const scheme = req?.body?.scheme || 'https'
    const route = req?.body?.route || ''
    
    try {

      let sites = null
      let site = null
      let page = null

      let siteData = null
      let pageData = null
      let headersData = null
      let contentsData = null
      let footersData = null
      
      //get sites
      sites = await new ItemsService('linotype_sites', { schema: req.schema, accountability: req.accountability }).readByQuery({
        fields: ['*'],
        filter: {
          status: 'online',
          ["domain_" + env] : { _eq: domain },
        }
      })
      
      //filter sites with current path and get first
      site = sites?.filter((item: any) => {
        if( item.path && item.path !== '/' ) {
          return route.startsWith(item.path)
        } else {
          return true
        }
      }).reverse()[0] || null

      //get site route
      let siteRoute = site.path ? route.slice(site.path.length) : route
      siteRoute = siteRoute ? siteRoute : '/'

      //check if site exist
      if ( site?.status == 'online' ) {

        //get page from site and slug
        page = await new ItemsService('linotype_pages', { schema: req.schema, accountability: req.accountability }).readByQuery({
          fields: ['*.*.*.*.*.*.*'],
          filter: {
            status: 'published',
            slug: siteRoute,
            target: { 
              id : { _eq: site.id }
            }
          },
          limit: 1,
        })

        //check if page has content
        if (page[0]?.content) {
          
          siteData = {
            id: page[0]?.target?.id,
            status: page[0]?.target?.status,
            name: page[0]?.target?.name,
            domain: page[0]?.target["domain_" + env],
            url: scheme + '://' + page[0]?.target["domain_" + env]
          }

          pageData = {
            id: page[0]?.id,
            title: page[0]?.title,
            status: page[0]?.status,
            domain: page[0]?.target["domain_" + env],
            slug: page[0]?.slug,
            url: scheme + '://' + page[0]?.target["domain_" + env] + page[0]?.slug,
            seo: {
              title: page[0]?.seo_title ? page[0]?.seo_title : page[0]?.title,
              description: page[0]?.seo_description,
              image: page[0]?.seo_image,
            },
          }

          if ( ! page[0]?.hide_default_header ) {
            headersData = page[0]?.target?.header.map((item: any) => {
              return {
                id: item.id,
                type: item.collection.replace('linotype_block__', ''),
                collection: item.collection,
                data: blockExtends(item.item),
              }
            }).filter((item: any) => item?.data?.status === 'published' )
          }

          contentsData = page[0]?.content.map((item: any) => {
            return {
              id: item.id,
              type: item.collection.replace('linotype_block__', ''),
              collection: item.collection,
              data: blockExtends(item.item),
            }
          }).filter((item: any) => item?.data?.status === 'published' )

          if ( ! page[0]?.hide_default_footer ) {
            footersData = page[0]?.target?.footer.map((item: any) => {
              return {
                id: item.id,
                type: item.collection.replace('linotype_block__', ''),
                collection: item.collection,
                data: blockExtends(item.item),
              }
            }).filter((item: any) => item?.data?.status === 'published' )
          }

        }

      }

      res.send({
        website: siteData,
        page: pageData,
        headers: headersData,
        contents: contentsData,
        footers: footersData,
      })

    } catch (error) {
      
      res.send({
        status: "error", 
        message: `Linotype Not Found`
      })
    
    }

  })

}

const blockExtends = (data: any) => {

  if ( data?.block_extends ) {
    var block_override = omitBy(data, isNil)
    
    delete(block_override?.block_extends)
    delete(block_override?.preview)

    data = merge(data.block_extends, block_override)
  }
  return data

}
