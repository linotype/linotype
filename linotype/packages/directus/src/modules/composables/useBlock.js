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
  const { reloadLinotype } = useUtils()

  const deleteBlock = async (block) => {
    
    await api.delete(`/collections/linotype_block__${block.id}` ).catch(function (error) {
      logs.value.push(error.toJSON());
    });

    await reloadLinotype()

  }

  /**
   * returns
   */
  return {
    deleteBlock
  }
  
}

export default useBlock
