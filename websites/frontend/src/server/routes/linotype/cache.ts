export default defineEventHandler(async () => {

  const storage = await useStorage('linotype_cache');

  const keys = await storage.getKeys();
  const keysToInvalidate = [];

  for (let key of keys) {
      // if (key.startsWith('nitro:routes:_:_:profile')) {
          keysToInvalidate.push(key);
      // }
  }

  for (let key of keysToInvalidate) {
      storage.removeItem(key);
  }

  return JSON.stringify(keysToInvalidate);
});