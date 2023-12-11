import { merge, omitBy, isNil } from 'lodash-es'

export default (router: any, { services }: any) => {
	
  const { ItemsService } = services

  router.get('/page', async (req: any, res: any) => {

    const env = req?.query?.env || 'local'
    const domain = req?.query?.domain || 'localhost'
    const scheme = req?.query?.scheme || 'https'
    const route = req?.query?.route == '/' ? '' : req?.query?.route  || ''
    
    
    try {

      let siteData = null
      let pageData = null
      let headersData = null
      let contentsData = null
      let footersData = null

      const page = await new ItemsService('linotype_pages', { schema: req.schema, accountability: req.accountability }).readByQuery({
        fields: [
          '*.*.*.*.*.*.*.*'
        ],
        filter: {
          status: 'published',
          slug: { _ends_with: route },
          _and: [
            {
              target: { 
                status: { _eq: 'online' },
              }
            },
            {
              target: { 
                [`domain_${env}`]: { _eq: domain } 
              }
            }
          ]
        },
        // limit: 1,
      })

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
          })
        }

        contentsData = page[0]?.content.map((item: any) => {
          return {
            id: item.id,
            type: item.collection.replace('linotype_block__', ''),
            collection: item.collection,
            data: blockExtends(item.item),
          }
        })

        if ( ! page[0]?.hide_default_footer ) {
          footersData = page[0]?.target?.footer.map((item: any) => {
            return {
              id: item.id,
              type: item.collection.replace('linotype_block__', ''),
              collection: item.collection,
              data: blockExtends(item.item),
            }
          })
        }

      }

      res.send({
        request: {
          env: env,
          domain: domain,
          scheme: scheme,
          route: route,
        },
        response: {
          page: page
        },
        website: siteData,
        page: pageData,
        headers: headersData,
        contents: contentsData,
        footers: footersData,
      })

    } catch (error) {
      
      console.log('linotype:directus:endpoints:page:error', error)
      
      res.send({
        status: "error", 
        message: `Page Not Found`,
        request: {
          env: env,
          domain: domain,
          scheme: scheme,
          route: route,
        },
        response: {
          error: error,
        },
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
