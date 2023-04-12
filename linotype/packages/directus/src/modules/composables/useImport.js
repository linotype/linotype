import { useApi } from '@directus/extensions-sdk'
import useUtils from './useUtils'
import { ref } from 'vue'

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
  const { getBlocksCollections, reloadLinotype } = useUtils()


  /**
   * import block to directus
   */
  const importBlock = async (block) => {
    console.log('importBlock', block)
    
    //import all data from block snapshot
    for await (const collection of block?.snapshot?.collections?.reverse()) {
      await importCollection(collection)
    }
    for await (const field of block?.snapshot?.fields) {
      await importField(field)
    }
    for await (const relation of block?.snapshot?.relations) {
      await importRelation(collection)
    }
    // await block?.snapshot?.collections?.reverse().map( async (collection) => await importCollection(collection))
    // await block?.snapshot?.fields?.map( async (field) => await importField(field))
    // await block?.snapshot?.relations?.map( async (relation) => await importRelation(relation))

    //refresh
    await updateComposerRelations()
    await applyPermissions()
    await reloadLinotype()

    //success
    logs.value.push('import done' )


  }

  /**
   * import collection and log
   */
  const importCollection = async (collection) => {
    console.log('importCollection', collection)
    const response = await api.post(`/collections`, collection ).catch(function (error) {
      console.log('error', error.toJSON())
      logs.value.push(error.toJSON());
    })
    logs.value.push(`importCollection: ${collection.collection}`)
  }

  /**
   * import fields and log
   */
  const importField = async (field) => {
    console.log('importField', field)
    const response = await api.post(`/fields/${field.collection}`, field ).catch(function (error) {
      console.log('error', error.toJSON())
      logs.value.push(error.toJSON());
    })
    logs.value.push(`importField: ${field.collection}`)
  }

  /**
   * import relations and log
   */
  const importRelation = async (relation) => {
    console.log('importRelation', relation)
    const response = await api.post(`/relations`, relation ).catch(function (error) {
      console.log('error', error.toJSON())
      logs.value.push(error.toJSON());
    })
    logs.value.push(`importRelation: ${relation.collection} related with ${relation.related_collection}`)
  }

  /**
   * Update relation to add new block to linotype composer fields
   */
  const updateComposerRelations = async () => {
    const composerAvalableBlocks = await getBlocksCollections()
    for await (const collection of ['linotype_pages_content', 'linotype_sites_header', 'linotype_sites_footer']) {
      await api.patch(`/relations/${collection}/item`, {
        "collection": collection,
          "field": "item",
          "meta": {
            "junction_field": "linotype_sites_id",
            "many_collection": collection,
            "many_field": "item",
            "one_allowed_collections": composerAvalableBlocks,
            "one_collection": null,
            "one_collection_field": "collection",
            "one_deselect_action": "nullify",
            "one_field": null,
            "sort_field": null
          },
          "related_collection": null,
          "schema": null
      } ).catch(function (error) {
        logs.value.push(error.toJSON());
      });
    }
  }

  /**
   * Apply permission to all blocks for public read access
   */
  const applyPermissions = async () => {
    
    const composerAvalableBlocks = await getBlocksCollections()

    //Get default public permissions ID for linotype collections
    const permissions = await api.get(`/permissions`).catch(function (error) { logs.value.push(error.toJSON()) })
    const permissionsList = permissions?.data?.data.reduce((results, item) => {
      if( item.collection.startsWith("linotype_") && item.action == 'read' && item.fields[0] == '*' ) {
        results.push(item.id)
      }
      return results;
    }, [])
    
    //Delete all default public permissions for linotype collections
    if ( permissionsList.length ) {
      await api.delete(`/permissions`, permissionsList).catch(function (error) {
        logs.value.push(error.toJSON());
      })
    }
    
    //create new defaults permissions for linotype collections 
    const newPermissions = []
    for (const item of composerAvalableBlocks) {
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
   * returns
   */
  return {
    importBlock
  }
  
}

export default useImport
