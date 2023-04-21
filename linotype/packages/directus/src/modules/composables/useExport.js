import { ref } from 'vue'
import { useApi } from '@directus/extensions-sdk'

/**
 * @useExport
 *
 * @author YannickArmspach
 * @version v1.0.0
 *
 */
const useExport = function () {
  
  const api = useApi()

  const getBlockSnapshot = async (collectionName, snapshot) => {
    return { 
      collections: snapshot.collections.filter((collection) => collection.collection === collectionName),
      fields: snapshot.fields.filter((field) => field.collection === collectionName),
      relations: snapshot.relations.filter((field) => field.related_collection === collectionName),
    }
  }

  const exportBlock = async (block) => {
    
    //get full snapshot
    const snapshot = (await api.get(`/schema/snapshot`).catch(function (error) {
      console.log(error.toJSON());
    }))?.data?.data || []

    //get block collection snapshot 
    const blockSnapshot = await getBlockSnapshot(`linotype_block__${block.id}`, snapshot)
    
    //find collections snapshots from relations
    blockSnapshot?.relations?.map( async (relation) => {
      if ( relation.collection ) {
        const blockRelationSnapshot = await getBlockSnapshot(relation.collection, snapshot)
        blockSnapshot.collections = [...blockSnapshot.collections, ...blockRelationSnapshot.collections]
        blockSnapshot.fields = [...blockSnapshot.fields, ...blockRelationSnapshot.fields]
        blockSnapshot.relations = [...blockSnapshot.relations, ...blockRelationSnapshot.relations]
      }
    })
    
    //find collections snapshots from relational fields (m2m, etc.)
    snapshot?.fields?.map( async (field) => {
      if ( field?.collection?.startsWith('linotype_block__') && field?.schema?.foreign_key_table ) { 
        const blockRelationSnapshot = await getBlockSnapshot(field.schema.foreign_key_table, snapshot)
        blockSnapshot.collections = [...blockSnapshot.collections, ...blockRelationSnapshot.collections]
        blockSnapshot.fields = [...blockSnapshot.fields, ...blockRelationSnapshot.fields]
        blockSnapshot.relations = [...blockSnapshot.relations, ...blockRelationSnapshot.relations]
      }
    })

    //get linotype config
    const { data: config } = await api.get(`/linotype/config`).catch(function (error) {
      console.log(error.toJSON());
    })

    //define block config
    const blockConfig = {
      id: block.id,
      version: 1.0,
      snapshot: blockSnapshot
    }

    //send block config to frontend
    const rawResponse = await fetch(`${config.env.public['LINOTYPE_FRONTEND_URL']}/linotype/block/sync`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blockConfig)
    });
    const response = await rawResponse.json();

    console.log(response);

  }

  /**
   * returns
   */
  return {
    exportBlock
  }
  
}

export default useExport
