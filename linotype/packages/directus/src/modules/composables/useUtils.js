import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useApi, useStores } from '@directus/extensions-sdk'
import linotypeCollectionsConfig from './../../../config/linotype.yaml'

//global store
const isLinotypeInstalled = ref(true)
const blocksStore = ref([])
const linotypeStore = ref([])
const allowedBlocksIds = ref([])

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
   * Get collections from current frontend project 
   */
  const loadLinotypeStore = async () => {
    const response = await api.get(`/collections`).catch(function (error) {
      console.log(error.toJSON());
    })
    linotypeStore.value = response?.data?.data.filter((item) => item.collection.startsWith("linotype_")) || []
  }

  /**
   * Get blocks config from current frontend project 
   */
  const loadBlocksStore = async () => {
    const blocks = []
    const response = await api.get(`/linotype/blocks`).catch(function (error) {
      console.log(error.toJSON());
    })
    for await (const data of response?.data) {
      blocks.push({
        active: checkBlockInstalled(data.config.id),
        ...data
      })
    }
    blocksStore.value = blocks
    allowedBlocksIds.value = blocks.reduce((results, item) => {
      if( item.active && item?.config?.snapshot?.collections[0]?.collection ) results.push(item.config.snapshot.collections[0].collection)
      return results
    }, [])
  }

  /**
   * Check if linotype is installed by checking if linotype_sites table exist
   */
  const checkLinotypeInstalled = () => {
    return linotypeStore.value.filter((item)=> item.collection == 'linotype_sites' ).length ? true : false
  }

  /**
   * Check if linotype block is installed by checking if linotype_block__{id} table exist
   */
  const checkBlockInstalled = (id) => {
    return linotypeStore.value.filter((item) => item.collection === `linotype_block__${id}`)?.length ? true : false
  }

  /**
   * Hydrate directus with linotype changes 
   */
  const hydrateDirectus = async () => {
    await Promise.all([fieldsStore.hydrate(), collectionsStore.hydrate(), relationsStore.hydrate()])
  } 

  /**
   * refresh payload on demand
   */
  const refresh = async () => {
    
    await loadLinotypeStore()
    await loadBlocksStore()
    
    isLinotypeInstalled.value = checkLinotypeInstalled()

    await hydrateDirectus()

    console.log('[linotype] payload', {
      isLinotypeInstalled: isLinotypeInstalled.value,
      linotypeStore: linotypeStore.value,
      blocksStore: blocksStore.value,
      allowedBlocksIds: allowedBlocksIds.value,
    })
    
  }

  /**
   * init payload on mount
   */
  onMounted(async () => {
    await refresh()
  })

  /**
   * returns
   */
  return {
    isLinotypeInstalled,
    linotypeStore,
    blocksStore,
    allowedBlocksIds,
    refresh,
  }
  
}

export default useUtils
