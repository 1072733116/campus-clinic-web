/**
 *
 * @author:ChenDW
 * @date:2023-01-07 17:25
 */
enum CacheType {
  SESSION_STORAGE,
  LOCAL_STORAGE
}

class Cache {
  storage: Storage;

  constructor(type: CacheType) {
    this.storage = type === CacheType.SESSION_STORAGE ? sessionStorage : localStorage;
  }

  setCache(key: string, value: any) {
    if (key && value) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key);
  }

  clearCache() {
    this.storage.clear();
  }
}

const localCache = new Cache(CacheType.LOCAL_STORAGE);
const sessionCache = new Cache(CacheType.SESSION_STORAGE);

export { localCache, sessionCache };
