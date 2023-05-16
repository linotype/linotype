import { ref } from 'vue'
import { useApi } from '@directus/extensions-sdk'
import useUtils from './useUtils'
import useBlock from './useBlock'

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

  const { getBlockConfig } = useBlock()
  const { allowedBlocksIds, blocksDatabaseStore, refresh } = useUtils()


  /**
   * import block to directus
   */
  const importBlock = async (blockID) => {
    
    const block = getBlockConfig(blockID, 'file')
    
    //import collections, reversed for dependencies 
    for await (const collection of block?.snapshot?.collections?.reverse()) {
      await importCollection(collection)
    }
    
    //delete collections if not present in schema
    //TODO

    //import fields
    for await (const field of block?.snapshot?.fields) {
      await importField(field)
    }

    //delete field if not present in schema
    const databaseBlockFields = blocksDatabaseStore.value.find(item => item.id == blockID)?.snapshot?.fields || []
    const schemaBlockFieldsId = Object.values(block?.snapshot?.fields.map((item) => item.field ) )
    for (const databaseBlockField of databaseBlockFields ) {
      if ( schemaBlockFieldsId.includes(databaseBlockField.field) === false ) {
        deleteField(databaseBlockField)
      }
    }

    //import relations
    for await (const relation of block?.snapshot?.relations) {
      await importRelation(relation)
    }

    //delete relations if not present in schema
    //TODO

    //refresh
    await refresh()
    await applyPermissions()
    await refresh()
    await updateComposerRelations()
    await refresh()

  }

  /**
   * import collection
   */
  const importCollection = async (collection) => {
    const response = await api.post(`/collections`, collection ).catch(function (error) {
      console.log('importCollection error', error.toJSON())
    })
  }

  /**
   * import fields
   */
  const importField = async (field) => {
    const response = await api.post(`/fields/${field.collection}`, field ).catch(function (error) {
      console.log('importField error', error.toJSON())
    })
  }

  /**
   * delete fields
   */
  const deleteField = async (field) => {
    const response = await api.delete(`/fields/${field.collection}/${field.field}` ).catch(function (error) {
      console.log('importField error', error.toJSON())
    })
  }

  /**
   * import relations
   */
  const importRelation = async (relation) => {
    const response = await api.post(`/relations`, relation ).catch(function (error) {
      console.log('importRelation error', error.toJSON())
    })
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
