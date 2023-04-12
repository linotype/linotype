import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useApi, useStores } from '@directus/extensions-sdk'
import linotypeCollectionsConfig from './../../../config/linotype.yaml'

/**
 * @useLinotype
 *
 * @description
 * Linotype backend engine for Directus
 *
 * @author YannickArmspach
 * @version v1.0.0
 *
 */

const logs = ref([])
const isActive = ref(true)
const blocksList = ref([])
const collectionsList = ref([])

const useLinotype = function () {
  
  /**
   * Use directus router
   */
  const router = useRouter();

  /**
   * Use directus axios api
   */
  const api = useApi()

  /**
   * Use directus store
   */
  const { useCollectionsStore, useFieldsStore, useRelationsStore } = useStores();
	const collectionsStore = useCollectionsStore();
  const fieldsStore = useFieldsStore();
  const relationsStore = useRelationsStore()

  /**
   * Get collections from current frontend project 
   */
  const loadCollectionsList = async () => {
    const response = await api.get(`/collections`).catch(function (error) {
      logs.value.push(error.toJSON());
    })
    collectionsList.value = response?.data?.data.filter((item) => item.collection.startsWith("linotype_")) || []
  }

  /**
   * Get blocks config from current frontend project 
   */
  const loadBlocksList = async () => {
    const blocks = []
    const response = await api.get(`/linotype/blocks`).catch(function (error) {
      logs.value.push(error.toJSON());
    })
    
    for await (const data of response?.data) {
      blocks.push({
        name: data.name,
        active: collectionsList.value.filter((item)=> item.collection == `linotype_block__${data.name}` ).length ? true : false,
        ...data
      })
    }
    blocksList.value = blocks
  }

  /**
   * install default directus collections for linotype
   */
  const installLinotype = async () => {
    await install(linotypeCollectionsConfig)
    await applyPermissions()
    await reload()
    await init()
    await installBaseItems()
    await applyPresets()
  }
  
  /**
   * update default directus collections for linotype
   */
  const updateLinotype = async () => {
    await update(linotypeCollectionsConfig)
    await reload()
    await init()
  }

  /**
   * delete all directus collections used with linotype
   * TODO: reorder dep to run uninstall once
   */
  const uninstallLinotype = async () => {
    await uninstall(collectionsList.value)
    await uninstall(collectionsList.value)
    await uninstall(collectionsList.value)
    await reload()
    await init()
  }

  const installAllBlock = async () => {
    for await (const block of blocksList.value) {
      await installBlockFunction(block.config)
    }
    await updateBlockComposerRelation()
    await applyPermissions()
    await reload()
    await init()
  }

  const uninstallAllBlock = async () => {
    for await (const block of blocksList.value) {
      await uninstallBlockFunction(block.config)
    }
    await updateBlockComposerRelation()
    await reload()
    await init()
  }

  const installBlock = async (block) => {
    await installBlockFunction(block.config)
    await updateBlockComposerRelation()
    await applyPermissions()
    await reload()
    await init()
  }

  const uninstallBlock = async (block) => {
    await uninstallBlockFunction(block.config)
    await updateBlockComposerRelation()
    await reload()
    await init()
  }

  /**
   * install a linotype block in directus
   */
  const installBlockFunction = async (config) => {
    logs.value = ['install block start']

    const collection = { 
      collection: 'linotype_block__' + config.name, 
      meta: {
        ...config.meta,
        group: 'linotype_blocks',
        display_template: '{{reference}}',
        singleton: false,
        sort_field: 'sort',
        accountability: 'all',
        archive_app_filter: true,
        archive_field: 'status',
        archive_value: 'archived',
        unarchive_value: 'draft',
        collapse: 'open',
        item_duplication_fields: config.field?.map((item) => item.name ) || [],
      }, 
      schema: { 
        name: 'linotype_block__' + config.name, 
        comment: null 
      } 
    }
    await api.post(`/collections`, collection ).catch(function (error) {
      logs.value.push(error.toJSON());
    })

    const defaultBlockFields = [
      {
        "name": "sort",
        "type": "integer",
        "meta": {
          "conditions": null,
          "display": null,
          "display_options": null,
          "field": "sort",
          "group": null,
          "hidden": true,
          "interface": "input",
          "note": null,
          "options": null,
          "readonly": false,
          "required": false,
          "sort": 1,
          "special": null,
          "translations": null,
          "validation": null,
          "validation_message": null,
          "width": "full"
        }
      },
      {
        "name": "reference",
        "type": "string",
        "meta": {
          "conditions": null,
          "display": "raw",
          "display_options": null,
          "field": "reference",
          "group": null,
          "hidden": false,
          "interface": "input",
          "note": null,
          "options": {
            "iconLeft": "flag",
            "placeholder": "Define a unique reference for this block",
            "trim": true
          },
          "readonly": false,
          "required": true,
          "sort": 1,
          "special": null,
          "translations": [
            {
              "language": "en-US",
              "translation": "Reference"
            }
          ],
          "validation": null,
          "validation_message": null,
          "width": "half"
        }
      },
      {
        "name": "status",
        "type": "string",
        "meta": {
          "conditions": null,
          "display": "labels",
          "display_options": {
            "choices": [
              {
                "text": "$t:published",
                "value": "published",
                "background": "var(--primary)",
                "foreground": "#FFFFFF"
              },
              {
                "text": "$t:draft",
                "value": "draft",
                "background": "#D3DAE4",
                "foreground": "#18222F"
              },
              {
                "text": "$t:archived",
                "value": "archived",
                "background": "var(--warning)",
                "foreground": "#FFFFFF"
              }
            ],
            "showAsDot": true
          },
          "field": "status",
          "group": null,
          "hidden": false,
          "interface": "select-dropdown",
          "note": null,
          "options": {
            "icon": "public",
            "placeholder": "Select a block status",
            "choices": [
              {
                "text": "$t:published",
                "value": "published"
              },
              {
                "text": "$t:draft",
                "value": "draft"
              },
              {
                "text": "$t:archived",
                "value": "archived"
              }
            ]
          },
          "readonly": false,
          "required": true,
          "sort": 1,
          "special": null,
          "translations": null,
          "validation": null,
          "validation_message": null,
          "width": "half"
        },
        "schema": {
          "default_value": "published"
        }
      }
    ]
    const fields = [ ...defaultBlockFields, ...(config?.fields || [] )].map((item) => { 
      return {
        field: item.name, 
        type: item.type, 
        meta: {
          ...item.meta,
          sort: item.meta.sort + 10
        },
        schema: {
          ...item.schema,
        }
      }
    })
    
    for await (const field of fields) {
      logs.value.push('install block field: ' + field.field)
      await api.post(`/fields/${'linotype_block__' + config.name}`, field ).catch(function (error) {
        logs.value.push(error.toJSON());
      });
    }
    const relations = (config?.fields || [] ).reduce((results, item) => {
      if ( item?.relation?.related_collection ) {
        results.push({
          collection: 'linotype_block__' + config.name,
          field: item.name,
          related_collection: item?.relation?.related_collection || null,
          meta: item?.relation?.meta || null,
        })
      }
      return results
    }, [])
    for await (const relation of relations) {
      logs.value.push('install relation: ' + relation.related_collection)
      await api.post(`/relations`, relation ).catch(function (error) {
        logs.value.push(error.toJSON());
      });
    }
    logs.value = ['install block end']
  }

  /**
   * install a linotype block in directus
   */
  const uninstallBlockFunction = async (config) => {
    logs.value = ['uninstall block start']
    await api.delete(`/collections/linotype_block__${config.name}` ).catch(function (error) {
      logs.value.push(error.toJSON());
    });
    logs.value = ['uninstall block success']
  }

  const updateBlockComposerRelation = async () => {
    await loadCollectionsList()
    await loadBlocksList()
    const activeBlocks = blocksList.value.filter((item)=> item.active)
    const relationConfigs = []
    // for (const activeBlock of activeBlocks) {
    //   relationConfigs.push({
    //     "collection": `linotype_block__${activeBlock.config.name}`,
    //     "field": "reference",
    //     "meta": {
    //       "junction_field": null,
    //       "many_collection": `linotype_block__${activeBlock.config.name}`,
    //       "many_field": "reference",
    //       "one_allowed_collections": null,
    //       "one_collection": null,
    //       "one_collection_field": null,
    //       "one_deselect_action": "nullify",
    //       "one_field": null,
    //       "sort_field": null
    //     },
    //     "related_collection": null,
    //     "schema": null
    //   })
    // }
    relationConfigs.push({
      "collection": "linotype_pages_content",
        "field": "item",
        "meta": {
          "junction_field": "linotype_pages_id",
          "many_collection": "linotype_pages_content",
          "many_field": "item",
          "one_allowed_collections": activeBlocks.map((block) => `linotype_block__${block.config.name}`),
          "one_collection": null,
          "one_collection_field": "collection",
          "one_deselect_action": "nullify",
          "one_field": null,
          "sort_field": null
        },
        "related_collection": null,
        "schema": null
    })
    relationConfigs.push({
      "collection": "linotype_sites_header",
        "field": "item",
        "meta": {
          "junction_field": "linotype_sites_id",
          "many_collection": "linotype_sites_header",
          "many_field": "item",
          "one_allowed_collections": activeBlocks.map((block) => `linotype_block__${block.config.name}`),
          "one_collection": null,
          "one_collection_field": "collection",
          "one_deselect_action": "nullify",
          "one_field": null,
          "sort_field": null
        },
        "related_collection": null,
        "schema": null
    })
    relationConfigs.push({
      "collection": "linotype_sites_footer",
        "field": "item",
        "meta": {
          "junction_field": "linotype_sites_id",
          "many_collection": "linotype_sites_footer",
          "many_field": "item",
          "one_allowed_collections": activeBlocks.map((block) => `linotype_block__${block.config.name}`),
          "one_collection": null,
          "one_collection_field": "collection",
          "one_deselect_action": "nullify",
          "one_field": null,
          "sort_field": null
        },
        "related_collection": null,
        "schema": null
    })
    for await (const relationConfig of relationConfigs) {
      await api.patch(`/relations/${relationConfig.collection}/${relationConfig.field}`, relationConfig ).catch(function (error) {
        logs.value.push(error.toJSON());
      });
    }
  
  }

  /**
   * install directus collection from config
   * TODO: reorder dep to not use update after install
   */
  const install = async (directusConfig) => {
    logs.value = ['install start']
    for await (const collectionConfig of directusConfig.collections) {
      logs.value.push('install collection: ' + collectionConfig.collection)
      await api.post(`/collections`, collectionConfig ).catch(function (error) {
        logs.value.push(error.toJSON());
      });
    }
    for await (const fieldConfig of directusConfig.fields) {
      logs.value.push('install field: ' + fieldConfig.field)
      await api.post(`/fields/${fieldConfig.collection}`, fieldConfig ).catch(function (error) {
        logs.value.push(error.toJSON());
      });
    }
    for await (const relationConfig of directusConfig.relations) {
      logs.value.push('install relation: ' + relationConfig.related_collection)
      await api.post(`/relations`, relationConfig ).catch(function (error) {
        logs.value.push(error.toJSON());
      });
    }
    await update(directusConfig)
    logs.value = ['install end']
  }

  /**
   * update directus collection from config
   */
  const update = async (directusConfig) => {
    logs.value = ['update start']
    for await (const collectionConfig of directusConfig.collections) {
      logs.value.push('update collection: ' + collectionConfig.collection)
      await api.patch(`/collections/${collectionConfig.collection}`, collectionConfig ).catch(function (error) {
        logs.value.push(error.toJSON());
      });
    }
    for await (const fieldConfig of directusConfig.fields) {
      logs.value.push('update field: ' + fieldConfig.field)
      await api.patch(`/fields/${fieldConfig.collection}/${fieldConfig.field}`, fieldConfig ).catch(function (error) {
        logs.value.push(error.toJSON());
      });
    }
    for await (const relationConfig of directusConfig.relations) {
      logs.value.push('update relation: ' + relationConfig.related_collection)
      await api.patch(`/relations/${relationConfig.collection}/${relationConfig.field}`, relationConfig ).catch(function (error) {
        logs.value.push(error.toJSON());
      });
    }
    logs.value = ['update end']
  }

  /**
   * uninstall all directus collections used by linotype
   */
  const uninstall = async (items) => {
    logs.value = ['uninstall start']
    for await (const item of items) {
      logs.value.push('uninstall collection: ' + item.collection)
      await api.delete(`/collections/${item.collection}` ).catch(function (error) {
        logs.value.push(error.toJSON());
      });
    }
    logs.value = ['uninstall end']
  }

  /**
   * reload directus collections and fields
   */
  const reload = async () => {
    await Promise.all([fieldsStore.hydrate(), collectionsStore.hydrate(), relationsStore.hydrate()])
  } 

  /**
   * Apply permission
   */
  const applyPermissions = async () => {
    await loadCollectionsList()
    await loadBlocksList()

    //Get default public permissions ID for linotype collections
    const permissions = await api.get(`/permissions`).catch(function (error) { logs.value.push(error.toJSON()) })
    const permissionsList = permissions?.data?.data.reduce((results, item) => {
      if( item.collection.startsWith("linotype_") && item.action == 'read' && item.fields[0] == '*' ) {
        results.push(item.id)
      }
      return results;
    }, [])
    
    //Delete all default public permissions for linotype collections
    await api.delete(`/permissions`, permissions).catch(function (error) {
      logs.value.push(error.toJSON());
    })
    
    //create new defaults permissions for linotype collections 
    const newPermissions = []
    for (const item of collectionsList.value) {
      newPermissions.push({ 
        collection: item.collection,
        action: "read",
        fields: ['*']
      })
    }
    await api.post(`/permissions`, newPermissions).catch(function (error) {
      logs.value.push(error.toJSON());
    })

  } 


  /**
   * Apply permission
   */
  const installBaseItems = async () => {

    await api.post(`/items/linotype_sites`, { name: 'default', status: 'online', domain_local: 'localhost' }).catch(function (error) {
      logs.value.push(error.toJSON());
    })

    await api.post(`/items/linotype_pages`, { title: 'demo', status: 'published', target: 1, slug: '/' }).catch(function (error) {
      logs.value.push(error.toJSON());
    })

  } 

  /**
   * Apply presets
   */
  const applyPresets = async () => {
    const presets = [
      {
        "collection": "linotype_pages",
        "layout": "tabular",
        "layout_options": {
          "tabular": {
            "widths": {
              "title": 220,
              "status": 115,
              "slug": 115,
              "target": 115
            }
          }
        },
        "layout_query": {
          "tabular": {
            "page": 1,
            "fields": [
              "title",
              "status",
              "target",
              "slug"
            ]
          }
        }
      },
      {
        "collection": "linotype_sites",
        "layout": "tabular",
        "layout_options": {
          "tabular": {
            "widths": {
              "name": 220,
              "status": 115,
              "domain_local": 220,
              "domain_staging": 220,
              "domain_production": 220,
              "domain_preproduction": 220
            }
          }
        },
        "layout_query": {
          "tabular": {
            "page": 1,
            "fields": [
              "name",
              "status",
              "domain_local",
              "domain_staging",
              "domain_preproduction",
              "domain_production",
              "path"
            ]
          }
        }
      }
    ]
    await api.post(`/presets`, presets).catch(function (error) {
      logs.value.push(error.toJSON());
    })
  }

  /**
   * Initialisation
   */
  const checkActive = async () => {
    isActive.value = collectionsList.value.filter((item)=> item.collection == 'linotype_sites' ).length ? true : false
  }

  /**
   * Initialisation
   */
  const init = async () => {
    await loadCollectionsList()
    await loadBlocksList()
    await checkActive()
    logs.value = []
  }

  /**
   * returns
   */
  return {
    init,
    logs,
    isActive,
    collectionsList,
    installLinotype,
    updateLinotype,
    uninstallLinotype,
    installBlock,
    uninstallBlock,
    installAllBlock,
    uninstallAllBlock,
    blocksList,
  };
};

export default useLinotype;
