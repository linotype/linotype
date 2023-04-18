import { ref } from 'vue'
import { useApi } from '@directus/extensions-sdk'
import useUtils from './useUtils'

/**
 * @useBlock
 *
 * @author YannickArmspach
 * @version v1.0.0
 *
 */
const useBlock = function () {
  
  const api = useApi()
  const { refresh, blocksStore } = useUtils()

  const getBlockConfig = async (block) => {
    
    //get full snapshot
    const snapshot = (await api.get(`/schema/snapshot`).catch(function (error) {
      console.log(error.toJSON());
    }))?.data?.data || []

    //get block collection snapshot 
    const blockSnapshot = await getBlockSnapshot(`linotype_block__${block.id}`, snapshot)
    
    //find relative collections snapshots
    blockSnapshot?.relations?.map( async (relation) => {
      const blockRelationSnapshot = await getBlockSnapshot(relation.collection, snapshot)
      blockSnapshot.collections = [...blockSnapshot.collections, ...blockRelationSnapshot.collections]
      blockSnapshot.fields = [...blockSnapshot.fields, ...blockRelationSnapshot.fields]
      blockSnapshot.relations = [...blockSnapshot.relations, ...blockRelationSnapshot.relations]
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

    return blockConfig

  }

  const deleteBlock = async (block) => {
    
    await api.delete(`/collections/linotype_block__${block.id}` ).catch(function (error) {
      logs.value.push(error.toJSON());
    });

    await refresh()

  }

  /**
   * returns
   */
  return {
    deleteBlock
  }
  
}

export default useBlock
