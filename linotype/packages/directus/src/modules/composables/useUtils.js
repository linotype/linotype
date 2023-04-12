import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useApi, useStores } from '@directus/extensions-sdk'
import linotypeCollectionsConfig from './../../../config/linotype.yaml'

/**
 * @useUtils
 *
 * @author YannickArmspach
 * @version v1.0.0
 *
 */
const useUtils = function () {
  
  //Use directus api
  const api = useApi()

  //Use directus store
  const { useCollectionsStore, useFieldsStore, useRelationsStore } = useStores();
	const collectionsStore = useCollectionsStore();
  const fieldsStore = useFieldsStore();
  const relationsStore = useRelationsStore()

  /**
   * Check if linotype is installed by checking if linotype_sites table exist
   */
  const checkLinotypeInstalled = async () => {
    return await getLinotypeCollections().filter((item)=> item.collection == 'linotype_sites' ).length ? true : false
  }

  /**
   * Hydrate directus with linotype changes 
   */
  const reloadLinotype = async () => {
    await Promise.all([fieldsStore.hydrate(), collectionsStore.hydrate(), relationsStore.hydrate()])
  } 

  /**
   * Get a list off all linotype collections
   */
  const getLinotypeCollections = async () => {
    const response = await api.get(`/collections`).catch(function (error) {
      logs.value.push(error.toJSON());
    })
    return response?.data?.data.filter((item) => item.collection.startsWith("linotype_")) || []
  }

  /**
   * Get a list off all linotype block collections
   */
  const getBlocksCollections = async () => {
    const response = await api.get(`/collections`).catch(function (error) {
      logs.value.push(error.toJSON());
    })
    return response?.data?.data.filter((item) => item.collection.startsWith("linotype_block__")) || []
  }

  /**
   * returns
   */
  return {
    checkLinotypeInstalled,
    getLinotypeCollections,
    getBlocksCollections,
    reloadLinotype,
  }
  
}

export default useUtils
