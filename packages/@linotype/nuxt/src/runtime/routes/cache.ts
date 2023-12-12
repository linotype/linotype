import { defineEventHandler } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async () => {

  const storage = useStorage('linotype_cache')
  const keys = await storage.getKeys()
  const keysToInvalidate = []

  for (const key of keys) {
      if (key.startsWith('linotype:linotype_cache')) {
          keysToInvalidate.push(key)
      }
  }

  for (const key of keysToInvalidate) {
      storage.removeItem(key)
  }

  return {
    removedKeys: keysToInvalidate,
    allKeys: keys
  }
})