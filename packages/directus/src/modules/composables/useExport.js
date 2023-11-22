import { ref } from 'vue'
import { useApi } from '@directus/extensions-sdk'
import useBlock from './useBlock'
import useUtils from './useUtils'

/**
 * @useExport
 *
 * @author YannickArmspach
 * @version v1.0.0
 *
 */
const useExport = function () {
  
  const { linotypeConfig } = useUtils()
  const { getBlockConfig } = useBlock()
  const { refresh, blocksFileStore, blocksDatabaseStore } = useUtils()

  const exportBlock = async (blockID) => {
    
    const blockConfig = blocksDatabaseStore.value.filter((block) => block.id == blockID )[0] || null

    //send block config to frontend
    const rawResponse = await fetch(`${linotypeConfig.value.env.public['LINOTYPE_FRONTEND_URL']}/linotype/block/sync`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blockConfig)
    });
    const response = await rawResponse.json();

    await refresh()
    
  }

  /**
   * returns
   */
  return {
    exportBlock
  }
  
}

export default useExport
