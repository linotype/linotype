import { ref } from 'vue'
import { useApi } from '@directus/extensions-sdk'
import useUtils from './useUtils'

/**
 * @useImport
 *
 * @author YannickArmspach
 * @version v1.0.0
 *
 */
const useImport = function () {
  
  const logs = ref([])

  const api = useApi()
  const { allowedBlocksIds, refresh } = useUtils()


  /**
   * import block to directus
   */
  const importBlock = async (block) => {
    console.log('importBlock', block)
    
    //import collections, reversed for dependencies 
    for await (const collection of block?.snapshot?.collections?.reverse()) {
      await importCollection(collection)
    }
    
    //import fields
    for await (const field of block?.snapshot?.fields) {
      await importField(field)
    }
    
    //import relations
    for await (const relation of block?.snapshot?.relations) {
      await importRelation(relation)
    }

    //refresh
    await refresh()
    await applyPermissions()
    await refresh()
    await updateComposerRelations()
    await refresh()

    //success
    console.log('import done' )

  }

  /**
   * import collection and log
   */
  const importCollection = async (collection) => {
    console.log('importCollection', collection)
    const response = await api.post(`/collections`, collection ).catch(function (error) {
      console.log('importCollection error', error.toJSON())
    })
    console.log(`importCollection: ${collection.collection}`)
  }

  /**
   * import fields and log
   */
  const importField = async (field) => {
    console.log('importField', field)
    const response = await api.post(`/fields/${field.collection}`, field ).catch(function (error) {
      console.log('importField error', error.toJSON())
    })
    console.log(`importField: ${field.collection}`)
  }

  /**
   * import relations and log
   */
  const importRelation = async (relation) => {
    console.log('importRelation', relation)
    const response = await api.post(`/relations`, relation ).catch(function (error) {
      console.log('importRelation error', error.toJSON())
    })
    console.log(`importRelation: ${relation.collection} related with ${relation.related_collection}`)
  }

  /**
   * Update relation to add new block to linotype composer fields
   */
  const updateComposerRelations = async () => {
    const composerRelations = [
      {
        many_collection:'linotype_sites_header',
        junction_field: 'linotype_sites_id',
        one_allowed_collections: allowedBlocksIds.value //todo: reduce if not allow in header
      },
      {
        many_collection:'linotype_pages_content',
        junction_field: 'linotype_pages_id',
        one_allowed_collections: allowedBlocksIds.value //todo: reduce if not allow in header
      },
      {
        many_collection:'linotype_sites_footer',
        junction_field: 'linotype_sites_id',
        one_allowed_collections: allowedBlocksIds.value //todo: reduce if not allow in header
      }
    ]
    for await (const composer of composerRelations) {
      await api.patch(`/relations/${composer.many_collection}/item`, {
        "collection": composer.many_collection,
          "field": "item",
          "meta": {
            "junction_field": composer.junction_field,
            "many_collection": composer.many_collection,
            "many_field": "item",
            "one_allowed_collections": composer.one_allowed_collections,
            "one_collection": null,
            "one_collection_field": "collection",
            "one_deselect_action": "nullify",
            "one_field": null,
            "sort_field": null
          },
          "related_collection": null,
          "schema": null
      } ).catch(function (error) {
        console.log(error.toJSON());
      });
    }
  }

  /**
   * Apply permission to all blocks for public read access
   */
  const applyPermissions = async () => {
    
    //Get default public permissions ID for linotype collections
    // const permissions = await api.get(`/permissions`).catch(function (error) { console.log(error.toJSON()) })
    // const permissionsList = permissions?.data?.data.reduce((results, item) => {
    //   if( item.collection.startsWith("linotype_") && item.action == 'read' && item.fields[0] == '*' ) {
    //     results.push(item.id)
    //   }
    //   return results;
    // }, [])
    
    //Delete all default public permissions for linotype collections
    // if ( permissionsList.length ) {
    //   await api.delete(`/permissions`, permissionsList).catch(function (error) {
    //     console.log(error.toJSON());
    //   })
    // }
    
    //create new defaults permissions for linotype collections 
    const newPermissions = []
    for (const collection of allowedBlocksIds.value) {
      newPermissions.push({ 
        collection: collection,
        action: "read",
        fields: ['*']
      })
    }

    //apply new permissions
    await api.post(`/permissions`, newPermissions).catch(function (error) {
      console.log('permission post error', error.toJSON());
    })

  } 

  /**
   * returns
   */
  return {
    importBlock
  }
  
}

export default useImport
