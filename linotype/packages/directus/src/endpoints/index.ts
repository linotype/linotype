import fs from 'fs'
import path from 'path'
import YAML from 'yaml'
import fetch from 'node-fetch'
import { merge, omitBy, isNil } from 'lodash-es'

export default (router: any, { services }: any) => {
	
  const { ItemsService } = services

  router.get('/', async (req: any, res: any) => {
    res.send({ 'linotype': 'v1.0.0'})
  })

  router.post('/sitemap', async (req: any, res: any) => {

    const env = req?.body?.env || 'local'
    const domain = req?.body?.domain || 'localhost'

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

  router.post('/template', async (req: any, res: any) => {

    let site = null
    let page = null

    let siteData = null
    let pageData = null
    let headersData = null
    let contentsData = null
    let footersData = null
    
    const env = req?.body?.env || 'local'
    const domain = req?.body?.domain || 'localhost'
    const scheme = req?.body?.scheme || 'https'
    const route = req?.body?.route || ''
    
    //get sites
		const sites = await new ItemsService('linotype_sites', { schema: req.schema, accountability: req.accountability }).readByQuery({
      fields: ['*.*.*.*.*.*.*'],
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
          // infos: site,
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

    }

    res.send({
      website: siteData,
      page: pageData,
      headers: headersData,
      contents: contentsData,
      footers: footersData,
    })

  })

  router.get('/config/blocks', async (req: any, res: any) => {
    let blocks: object[]|undefined = []
    if ( process.env['LINOTYPE_FRONTEND_URL'] ) {
      const response = await fetch(`${process.env['LINOTYPE_FRONTEND_URL']}/linotype`)
      blocks = await response.json() as object[]
    } else if ( process.env['LINOTYPE_FRONTEND_DIR'] ) {
      blocks = fromDirectory( path.join(__dirname, `${process.env['LINOTYPE_FRONTEND_DIR']}`), '.schema.yaml')
    }
    res.send(blocks)
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

const fromDirectory = (startPath: string, filter: string, blocks: object[] = []): object[] => {
  if (!fs.existsSync(startPath)) {
      console.log("no dir ", startPath)
      return []
  }
  var files = fs.readdirSync(startPath)
  for (var i = 0; i < files.length; i++) {
      var filename = path.join(startPath, files[i] as any)
      var stat = fs.lstatSync(filename)
      if (stat.isDirectory()) {
        fromDirectory(filename, filter, blocks)
      } else if (filename.endsWith(filter)) {
          const yamlFile = fs.readFileSync(filename, 'utf8')
          blocks.push( YAML.parse(yamlFile) )
      }
  }
  return blocks
}