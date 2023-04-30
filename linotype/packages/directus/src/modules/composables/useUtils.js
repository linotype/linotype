import { onMounted, ref } from 'vue'
import { useApi, useStores } from '@directus/extensions-sdk'

//state of linotype instalation
const isLinotypeInstalled = ref(true)

//state of linotype load
const linotypeLoaded = ref(false)

//get linotype config from env and database
const linotypeConfig = ref([])

//block store for app (db + file snapshot)
const blocksStore = ref([])

//blocks store from database (ref conf for export)
const blocksDatabaseStore = ref([])

//blocks store from file (ref conf for import)
const blocksFileStore = ref([])

//all linotype tables
const linotypeStore = ref([])

//full db snaphot
const snapshotStore = ref([])

//Active blocks id (used to update composer with new block)
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
   * Get full snapshot
   */
  const loadSnapshotStore = async () => {
    const response = await api.get(`/schema/snapshot`).catch(function (error) {
      console.log(error.toJSON());
    })
    snapshotStore.value = response?.data?.data || []
  }

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
    const blocksFile = []
    const blocksDatabase = []
    const response = await api.get(`/linotype/blocks`).catch(function (error) {
      console.log(error.toJSON());
    })
    for await (const data of response?.data) {
      const databaseConf = extractBlockConfig(data.id)
      blocks.push({
        id: data.id,
        active: checkBlockInstalled(data.id),
        version: data.version,
        updated: JSON.stringify(databaseConf.snapshot) === JSON.stringify(data.snapshot) ? true : false,
        snapshot: data.snapshot,
        snapshotDiff: databaseConf.snapshot, //add database snapshot for diff
        showDiff: false,
      })
      blocksFile.push({
        id: data.id,
        version: data.version,
        snapshot: data.snapshot,
      })
      blocksDatabase.push({
        id: data.id,
        version: data.version,
        snapshot: databaseConf.snapshot //override with database snapshot
      })
    }
    blocksStore.value = blocks
    blocksFileStore.value = blocksFile
    blocksDatabaseStore.value = blocksDatabase
    allowedBlocksIds.value = await blocks.reduce((results, item) => {
      if( item.active && item?.snapshot?.collections[0]?.collection ) results.push(item.snapshot.collections[0].collection)
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
   * get linotype env and database config
   */
  const getLinotypeConfig = async () => {
    const { data } = await api.get(`/linotype/config`).catch(function (error) {
      console.log(error.toJSON());
    })
    linotypeConfig.value = data
  }

  /**
   * get block config from snapshot
   */
  const extractBlockConfig = (blockID) => {

    //get block collection snapshot 
    const blockSnapshot = extractBlockConfigItem(`linotype_block__${blockID}`)
    
    //find collections snapshots from relations
    blockSnapshot?.relations?.map((relation) => {
      if ( relation.collection && ! relation.collection.startsWith('directus_') ) {
        const blockRelationSnapshot = extractBlockConfigItem(relation.collection)
        blockSnapshot.collections = [...blockSnapshot.collections, ...blockRelationSnapshot.collections]
        blockSnapshot.fields = [...blockSnapshot.fields, ...blockRelationSnapshot.fields]
        blockSnapshot.relations = [...blockSnapshot.relations, ...blockRelationSnapshot.relations]
      }
    })
    
    //find collections snapshots from relational fields (m2m, etc.)
    blockSnapshot?.fields?.map((field) => {
      if ( field?.schema?.foreign_key_table && ! field.schema.foreign_key_table.startsWith('directus_') ) { 
        const blockRelationSnapshot = extractBlockConfigItem(field.schema.foreign_key_table)
        blockSnapshot.collections = [...blockSnapshot.collections, ...blockRelationSnapshot.collections]
        blockSnapshot.fields = [...blockSnapshot.fields, ...blockRelationSnapshot.fields]
        blockSnapshot.relations = [...blockSnapshot.relations, ...blockRelationSnapshot.relations]
      }
    })

    //define block config
    const blockConfig = {
      id: blockID,
      version: 1.0,
      snapshot: blockSnapshot
    }

    return blockConfig

  }

  const extractBlockConfigItem = (collectionName) => {
    return { 
      collections: snapshotStore.value.collections.filter((collection) => collection.collection === collectionName),
      fields: snapshotStore.value.fields.filter((field) => field.collection === collectionName),
      relations: snapshotStore.value.relations.filter((field) => field.related_collection === collectionName),
    }
  }
  
  /**
   * refresh payload on demand
   */
  const refresh = async () => {
    
    await getLinotypeConfig()

    await loadSnapshotStore()
    await loadLinotypeStore()
    await loadBlocksStore()
    
    isLinotypeInstalled.value = checkLinotypeInstalled()

    await hydrateDirectus()

    console.log('[linotype] payload', {
      isLinotypeInstalled: isLinotypeInstalled.value,
      snapshotStore: snapshotStore.value,
      linotypeStore: linotypeStore.value,
      blocksStore: blocksStore.value,
      blocksFileStore: blocksFileStore.value,
      blocksDatabaseStore: blocksDatabaseStore.value,
      allowedBlocksIds: allowedBlocksIds.value,
    })
    
  }

  /**
   * init payload on mount
   */
  onMounted(async () => {
    if ( !linotypeLoaded.value ) {
      linotypeLoaded.value = true
      await refresh()
    }
  })

  /**
   * returns
   */
  return {
    linotypeConfig,
    isLinotypeInstalled,
    snapshotStore,
    linotypeStore,
    blocksStore,
    blocksFileStore,
    blocksDatabaseStore,
    allowedBlocksIds,
    refresh,
  }
  
}

export default useUtils
