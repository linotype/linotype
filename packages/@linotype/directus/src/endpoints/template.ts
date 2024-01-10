import { merge, omitBy, isNil } from 'lodash-es'
import { getAncestorsList } from './../utils/helpers'

export default (router: any, { services }: any) => {
	
  const { ItemsService } = services

  router.get('/template', async (req: any, res: any) => {

    const env = req?.query?.env || ''
    const domain = req?.query?.domain || ''
    const scheme = req?.query?.scheme || ''
    const route = req?.query?.route || ''
    
    console.log('params',{
      env: env,
      domain: domain,
      scheme: scheme,
      route: route
    })

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
        '*',
        
        'header.id',
        'header.collection',
        'header.item.*.*.*.*.*.*.*.*',

        'footer.id',
        'footer.collection',
        'footer.item.*.*.*.*.*.*.*.*',

        'domain_local',
        'domain_staging',
        'domain_preproduction',
        'domain_production',
      ],
      filter: {
        status: 'online',
        ["domain_" + env] : { _eq: domain },
      },
      limit: 1,
    })
    console.log('sites',sites)
    
    //filter sites with current path and get first
    // site = sites?.filter((item: any) => {
    //   if( item?.path && item.path && item.path !== '/' ) {
    //     return route.startsWith(item.path)
    //   } else {
    //     return true
    //   }
    // }).reverse()[0] || null

    //check if site exist
    if ( sites[0] && sites[0]?.status == 'online' ) {

      site = sites[0]

      //get site route
      // console.log('site:before',site)
      // if ( ! site?.path ) site.path = '/'
      // let siteRoute = site?.path ? route.slice(site.path.length) : route
      // siteRoute = siteRoute ? '/' + siteRoute.replace(/^\//, '') : '/'
      // console.log('site:after',site)

      let siteRoute = route
      
      //get page from site and slug
      page = await new ItemsService('linotype_pages', { schema: req.schema, accountability: req.accountability }).readByQuery({
        fields: [
          '*',
          'target',
          'parent.id',
          'parent.title',
          'parent.slug',
          'parent.parent',
          'parent.parent.id',
          'parent.parent.title',
          'parent.parent.slug',
          'parent.parent.parent',
          'parent.parent.parent.id',
          'parent.parent.parent.title',
          'parent.parent.parent.slug',
          'parent.parent.parent.parent',
          'parent.parent.parent.parent.id',
          'parent.parent.parent.parent.title',
          'parent.parent.parent.parent.slug',
          'parent.parent.parent.parent.parent',
          'parent.parent.parent.parent.parent.id',
          'parent.parent.parent.parent.parent.title',
          'parent.parent.parent.parent.parent.slug',
          'parent.parent.parent.parent.parent.parent',
          'content.id',
          'content.collection',
          'content.item.*.*.*.*.*.*.*.*',
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
      
      siteData = {
        id: site?.id,
        status: site?.status,
        name: site?.name || 'Unnamed',
        domain: site["domain_" + env],
        url: scheme + '://' + site["domain_" + env],
        favicon: site?.favicon || '',
        locale: site?.locale || 'en',
        seo: {
          title: site?.seo_title || '',
          description: site?.seo_description || '',
          image: site?.seo_image || ''
        },
        metas: site?.metas,
        robots: site?.robots,
        redirections: site?.redirections
      }

      headersData = site?.header.map((item: any) => {
        return {
          id: item.id,
          type: item.collection.replace('linotype_block__', ''),
          collection: item.collection,
          data: blockExtends(item.item),
        }
      }).filter((item: any) => item?.data?.status === 'published' )

      footersData = site?.footer.map((item: any) => {
        return {
          id: item.id,
          type: item.collection.replace('linotype_block__', ''),
          collection: item.collection,
          data: blockExtends(item.item),
        }
      }).filter((item: any) => item?.data?.status === 'published' )

      //check if page has content
      if (page[0]?.content) {
        
        pageData = {
          id: page[0]?.id,
          title: page[0]?.title,
          status: page[0]?.status,
          domain: site["domain_" + env],
          ancestors: getAncestorsList(page[0]?.parent)?.reverse() || null,
          slug: page[0]?.slug,
          url: scheme + '://' + site["domain_" + env] + page[0]?.slug,
          seo: {
            title: page[0]?.seo_title,
            description: page[0]?.seo_description,
            image: page[0]?.seo_image,
          }
        }

        contentsData = page[0]?.content.map((item: any) => {
          return {
            id: item.id,
            type: item.collection.replace('linotype_block__', ''),
            collection: item.collection,
            data: blockExtends(item.item),
          }
        }).filter((item: any) => item?.data?.status === 'published' )
        
        if ( page[0]?.hide_default_header ) headersData = null
        if ( page[0]?.hide_default_footer ) footersData = null

      }

      res.send({
        website: siteData,
        page: pageData,
        headers: headersData,
        contents: contentsData,
        footers: footersData,
      })

    } else{

      console.log('[linotype:directus:endpoints:template:error]', 'no data founded')

      res.send({
        status: 'error', 
        message: 'Template Not Found',
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
