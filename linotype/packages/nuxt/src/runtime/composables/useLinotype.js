import { Directus } from '@directus/sdk';
import useDomain from "./useDomain"
import { merge, omitBy, isNil } from 'lodash-es'
import { useRuntimeConfig, useState, useRoute } from 'nuxt/app'
import { nextTick, watch, computed } from 'vue'

/**
 * @useLinotype
 *
 * @description
 * Linotype Nuxt3 engine for Directus
 *
 * @author YannickArmspach
 * @since v1
 *
 */
const useLinotype = function () {
  /**
   * Use config
   */
  const config = useRuntimeConfig();

  /**
   * Use domain
   */
  const { scheme, domain } = useDomain();

  /**
   * Use route
   */
  const route = useRoute();

  /**
   * Use directus sdk
   */
  const directus = new Directus(config.LINOTYPE_DIRECTUS_URL);

  /**
   * Store website data
   */
  const website = useState('useLinotype.website', () => {
    return {};
  });

  /**
   * Store page data
   */
  const page = useState('useLinotype.page', () => {
    return {};
  });

  /**
   * Store blocks ids
   */
  // const blocksIds = useState('useLinotype.blocksIds', () => []);


  /**
   * Store headers data
   */
  const headers = useState('useLinotype.headers', () => {
    return {};
  });

  /**
   * Store contents data
   */
  const contents = useState('useLinotype.contents', () => {
    return {};
  });

  /**
   * Store footers data
   */
  const footers = useState('useLinotype.footers', () => {
    return {};
  });

  /**
   * Store error status
   */
  const error = useState('useLinotype.error', () => false);

  /**
   * Store loading status
   */
  const loading = useState('useLinotype.loading', () => true);

  /**
   * Store loading status
   */
  const refresh = useState('useLinotype.refresh', () => 0);

  /**
   * Store preview status
   */
  const preview = useState('useLinotype.preview', () => true);

  const getCurrentRoute = () => {
    let currentRoute = route.path ? route.path : '/'
    currentRoute = sanitizeRoute(currentRoute)
    return currentRoute
  }

  const sanitizeRoute = (route) => {
    return route.endsWith('/') ? route.slice(0, -1) : route
  }

  /**
   * Load Current Page Data
   *
   * @params none
   * @returns none
   */
  const loadTemplate = async () => {
    loading.value = true;
    error.value = false;

    let CurrentWebsite = null
    let CurrentPage = null

    headers.value = {}
    contents.value = {}
    footers.value = {}

    try {

      //get all sites configs with current domain
      CurrentWebsite = await directus.items('linotype_sites').readByQuery({
        fields: ['*.*.*.*.*.*.*'],
        filter: {
          status: 'online',
          ["domain_" + config.LINOTYPE_ENV] : { _eq: domain.value || 'localhost' },
        }
      });
      
      //filter sites with current path and get first
      CurrentWebsite = CurrentWebsite?.data.filter((site) => {
        if( site.path && site.path !== '/' ) {
          return getCurrentRoute().startsWith(site.path)
        } else {
          return true
        }
      }).reverse()[0]

      //get site route
      let siteRoute = CurrentWebsite.path ? getCurrentRoute().slice(CurrentWebsite.path.length) : getCurrentRoute()
      siteRoute = siteRoute ? siteRoute : '/'

      if ( CurrentWebsite?.status == 'online' ) {

        CurrentPage = await directus.items('linotype_pages').readByQuery({
          fields: ['*.*.*.*.*.*.*'],
          filter: {
            status: 'published',
            slug: siteRoute,
            target: { 
              id : { _eq: CurrentWebsite.id }
            }
          },
          limit: 1,
        });

        if (CurrentPage?.data[0]?.content) {
          const pageData = CurrentPage.data[0];
          
          website.value = {
            id: pageData?.target?.id,
            status: pageData?.target?.status,
            name: pageData?.target?.name,
            infos: CurrentWebsite,
            domain: pageData?.target["domain_" + config.LINOTYPE_ENV],
            url: scheme + '://' + pageData?.target["domain_" + config.LINOTYPE_ENV]
          };

          page.value = {
            id: pageData?.id,
            title: pageData?.title,
            status: pageData?.status,
            domain: pageData?.target["domain_" + config.LINOTYPE_ENV],
            slug: pageData?.slug,
            url: scheme + '://' + pageData?.target["domain_" + config.LINOTYPE_ENV] + pageData?.slug,
            seo: {
              title: pageData?.seo_title ? pageData?.seo_title : pageData?.title,
              description: pageData?.seo_description,
              image: pageData?.seo_image,
            },
          };

          if ( ! pageData?.hide_default_header ) {
            headers.value = pageData?.target?.header.map((item) => {
              return {
                id: item.id,
                type: item.collection.replace('linotype_block__', ''),
                collection: item.collection,
                data: blockExtends(item.item),
              };
            });
          }

          contents.value = pageData?.content.map((item) => {
            return {
              id: item.id,
              type: item.collection.replace('linotype_block__', ''),
              collection: item.collection,
              data: blockExtends(item.item),
            };
          });

          if ( ! pageData?.hide_default_footer ) {
            footers.value = pageData?.target?.footer.map((item) => {
              return {
                id: item.id,
                type: item.collection.replace('linotype_block__', ''),
                collection: item.collection,
                data: blockExtends(item.item),
              };
            });
          }

        } else {
          error.value = 'Page Not Found';
        }
      } else {
        error.value = 'Website Not Found';
      }
    } catch (error) {
      error.value = 'Linotype Error';
    }

    refresh.value++

    await nextTick( async () => {
      await new Promise(r => setTimeout(r, 300));
      loading.value = false;
    })

  };


  /**
   * Extends data from another block
   *
   * @params none
   * @returns none
   */
  const blockExtends = (data) => {

    if ( data?.block_extends ) {
      var block_override = omitBy(data, isNil);
      
      delete(block_override?.block_extends)
      delete(block_override?.preview)

      data = merge(data.block_extends, block_override)
    }
    return data

  }


  /**
   * Load Preview
   *
   * @params none
   * @returns none
   */
  const loadPreview = async (type, collection, primaryKey, editing = false) => {
    loading.value = true;
    error.value = false;

    try {
      let data = null;
      let current = null;

      if (editing) {
        current = await directus.items(collection).readOne(primaryKey, {
          fields: ['preview'],
        });
        data = current?.preview || null;
        delete data.preview;
      } else {
        current = await directus.items(collection).readOne(primaryKey, {
          fields: ['*.*.*.*.*.*.*'],
        });
        data = current;
        delete data.preview;
      }

      preview.value = []

      if ( type === 'template' ) {

        data.content.forEach((item)=>{
          preview.value.push({
            id: item.id,
            type: item.collection.replace('linotype_block__', ''),
            collection: item.collection,
            data: item.item,
          }) 
        })
        
      } else {
        
        preview.value = [{
          id: primaryKey,
          type: collection.replace('linotype_block__', ''),
          collection: collection,
          data: data,
        }];

      }

    } catch (error) {
      error.value = 'Preview Not Found';
    }

    loading.value = false;
  };

  /**
   * Load Block Component
   *
   * @params id
   * @returns Component
   */
  const loadBlock = (id) => {
    return `block-${id}-index`
    // return defineAsyncComponent( async () => {
    //   if ( blocksIds.value.includes(`${id}/${id}`) ) {
    //      const xxx = await import(`${process.cwd() ? process.cwd() : '.'}/src/components/blocks/${id}/${id}.index.vue`);
    //      console.log('xxx',xxx)
    //      return xxx
    //      } else {
    //     return import('./../components/linotype-default.vue');
    //   }
    // })
  };

  /**
   * Load linotype
   */
  const loadLinotype = async () => {
    
    watch( computed(() => route.path ), async () => {
      await loadTemplate()
    })
    
    await loadTemplate()

  }

  /**
   * Initialisation
   */
  const init = () => {

    //Get Active Block Ids
    // const components = import.meta.glob('./../../components/blocks/**/*.index.vue');
    // for (const path in components) {
    //   const match = path.match('blocks\/(.+)\/*.index.vue')
    //   if ( match.length && match[1] ) blocksIds.value.push( match[1] )
    // }
    
  }

  init()

  /**
   * returns
   */
  return {
    config,
    directus,
    loadLinotype,
    loadTemplate,
    loadPreview,
    loadBlock,
    website,
    page,
    headers,
    contents,
    footers,
    error,
    loading,
    refresh,
    preview,
  };
};

export default useLinotype;
