class LocalCache {
  setCache(key: string, value: any, isLocalStorage: boolean) {
    if (isLocalStorage) {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = window.localStorage.getItem(key)

    if (value) {
      return JSON.parse(value)
    }
  }

  getSessionCache(key: string) {
    const value = window.sessionStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  deleteSessionCache(key: string) {
    window.sessionStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }

  clearSessionCache() {
    window.sessionStorage.clear()
  }
}

export default new LocalCache()
