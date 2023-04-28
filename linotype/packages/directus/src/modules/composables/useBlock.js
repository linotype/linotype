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
  const { refresh, blocksFileStore, blocksDatabaseStore } = useUtils()

  const getBlockConfig = (blockID, source = 'file' ) => {
    if ( source = 'file' ) {
      return blocksFileStore.value.filter((block) => block.id == blockID )[0] || null
    } else if ( source = 'database' ) {
      return blocksDatabaseStore.value.filter((block) => block.id == blockID )[0] || null
    }
  }

  const getBlockConfigDiff = (blockID) => {
    return {
      fileConfig: getBlockConfig(blockID, 'file'),
      dbConfig: getBlockConfig(blockID, 'database')
    }
  }

  const deleteBlock = async (blockID) => {
    await api.delete(`/collections/linotype_block__${blockID}` ).catch(function (error) {
      console.log(error.toJSON());
    });
    await refresh()
  }

  /**
   * returns
   */
  return {
    getBlockConfig,
    getBlockConfigDiff,
    deleteBlock
  }
  
}

export default useBlock
