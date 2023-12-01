import { merge, omitBy, isNil } from 'lodash-es'

export default (router: any, { services }: any) => {
	
  const { ItemsService } = services

  router.get('/template', async (req: any, res: any) => {

    const env = req?.query?.env || 'local'
    const domain = req?.query?.domain || 'localhost'
    const scheme = req?.query?.scheme || 'https'
    const route = req?.query?.route || ''
    
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
        fields: [
          'id',
          'status',
          'path',
          'domain_local',
          'domain_staging',
          'domain_preproduction',
          'domain_production',
        ],
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
      if ( !site.path ) site.path = '/'
      let siteRoute = site.path ? route.slice(site.path.length) : route
      siteRoute = siteRoute ? '/' + siteRoute.replace(/^\//, '') : '/'

      //check if site exist
      if ( site?.status == 'online' ) {

        //get page from site and slug
        page = await new ItemsService('linotype_pages', { schema: req.schema, accountability: req.accountability }).readByQuery({
          fields: [
            '*',
            'target.*',
            
            'target.header.id',
            'target.header.collection',
            'target.header.item.*.*.*.*.*.*.*.*',

            'content.id',
            'content.collection',
            'content.item.*.*.*.*.*.*.*.*',

            'target.footer.id',
            'target.footer.collection',
            'target.footer.item.*.*.*.*.*.*.*.*',
          ],
          filter: {
            status: 'published',
            slug: siteRoute,
            target: { 
              id : { _eq: site.id }
            }
          },
          limit: 1,
        })
        
        //check if parent slug exist
        if ( !page.length ) {

          const findParentSlug = async (slug: string): Promise<[]> => {
            const parentSlug = slug.split('/').slice(0, -1).join('/')
            if ( !parentSlug ) return []
            const parentPage = await new ItemsService('linotype_pages', { schema: req.schema, accountability: req.accountability }).readByQuery({
              fields: [
                '*',
                'target.*',
                
                'target.header.id',
                'target.header.collection',
                'target.header.item.*.*.*.*.*.*.*.*',

                'content.id',
                'content.collection',
                'content.item.*.*.*.*.*.*.*.*',

                'target.footer.id',
                'target.footer.collection',
                'target.footer.item.*.*.*.*.*.*.*.*',
              ],
              filter: {
                status: 'published',
                slug: parentSlug,
                target: { 
                  id : { _eq: site.id }
                }
              },
              limit: 1,
            })
            if ( parentPage.length ) return parentPage
            return await findParentSlug(parentSlug)
          }

          page = await findParentSlug(siteRoute)
        
        }

        //check if page has content
        if (page[0]?.content) {
          
          siteData = {
            id: page[0]?.target?.id,
            status: page[0]?.target?.status,
            name: page[0]?.target?.name || 'Unnamed',
            domain: page[0]?.target["domain_" + env],
            url: scheme + '://' + page[0]?.target["domain_" + env] + (site.path !== '' && site.path),
            favicon: page[0]?.target?.favicon || '',
            locale: page[0]?.target?.locale || 'en_EN',
            seo: {
              title: page[0]?.target?.seo_title || '',
              description: page[0]?.target?.seo_description || '',
              image: page[0]?.target?.seo_image || ''
            },
            metas: page[0]?.target?.metas,
            robots: page[0]?.target?.robots,
            redirections: page[0]?.target?.redirections
          }

          pageData = {
            id: page[0]?.id,
            title: page[0]?.title,
            status: page[0]?.status,
            domain: page[0]?.target["domain_" + env],
            slug: page[0]?.slug,
            url: scheme + '://' + page[0]?.target["domain_" + env] + (site.path !== '' && site.path) + page[0]?.slug,
            seo: {
              title: page[0]?.seo_title,
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
