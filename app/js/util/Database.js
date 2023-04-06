class Database {
  constructor(name, version, objectStores) {
    this.name = name
    this.version = version
    this.objectStores = objectStores
    this.db = null
  }

  open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.name, this.version)

      request.onupgradeneeded = (event) => {
        const db = event.target.result
        for (const objectStore of this.objectStores) {
          if (!db.objectStoreNames.contains(objectStore.name)) {
            db.createObjectStore(objectStore.name, objectStore.options)
          }
        }
      }

      request.onsuccess = (event) => {
        this.db = event.target.result
        resolve(this)
      }

      request.onerror = (event) => {
        reject(event.target.error)
      }
    })
  }

  getObjectstore(objectStoreName) {
    return new Model(this, objectStoreName)
  }
}

class IDBConnectionError extends Error {
  constructor(message) {
    super(message)
    this.name = 'IDBConnectionError'
  }
}

class Model {
  constructor(database, objectStoreName) {
    this.database = database
    this.objectStoreName = objectStoreName
  }

  add(data, key) {
    return new Promise((resolve, reject) => {
      if (!this.database.db) {
        throw new IDBConnectionError('IndexedDB is not open.')
      }

      const transaction = this.database.db.transaction(
        this.objectStoreName,
        'readwrite'
      )
      const objectStore = transaction.objectStore(this.objectStoreName)
      const request = objectStore.add(data, key)

      request.onsuccess = (event) => {
        // return key
        resolve(event.target.result)
      }

      request.onerror = (event) => {
        reject(event.target.error)
      }
    })
  }

  get(key) {
    return new Promise((resolve, reject) => {
      if (!this.database.db) {
        throw new IDBConnectionError('IndexedDB is not open.')
      }

      const transaction = this.database.db.transaction(
        this.objectStoreName,
        'readonly'
      )
      const objectStore = transaction.objectStore(this.objectStoreName)
      const request = objectStore.get(key)

      request.onsuccess = (event) => {
        resolve(event.target.result)
      }

      request.onerror = (event) => {
        reject(event.target.error)
      }
    })
  }

  getAll(option = {}) {
    return new Promise((resolve, reject) => {
      if (!this.database.db) {
        throw new IDBConnectionError('IndexedDB is not open.')
      }
      const transaction = this.database.db.transaction(
        this.objectStoreName,
        'readonly'
      )
      const objectStore = transaction.objectStore(this.objectStoreName)

      const data = []

      let order = 'next'
      if (option && option.order) {
        order = option.order
      }

      const request = objectStore.openCursor(null, order)

      request.onsuccess = (event) => {
        const cursor = event.target.result

        if (cursor) {
          data.push(cursor.value)
          cursor.continue()
        } else {
          resolve(data)
        }
      }

      request.onerror = (event) => {
        reject(event.target.error)
      }
    })
  }

  update(data, key) {
    return new Promise((resolve, reject) => {
      if (!this.database.db) {
        throw new IDBConnectionError('IndexedDB is not open.')
      }

      const transaction = this.database.db.transaction(
        this.objectStoreName,
        'readwrite'
      )
      const objectStore = transaction.objectStore(this.objectStoreName)

      const request = objectStore.put(data, key)

      request.onsuccess = (event) => {
        // return key
        resolve(event.target.result)
      }

      request.onerror = (event) => {
        reject(event.target.error)
      }
    })
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      if (!this.database.db) {
        throw new IDBConnectionError('IndexedDB is not open.')
      }

      const transaction = this.database.db.transaction(
        this.objectStoreName,
        'readwrite'
      )
      const objectStore = transaction.objectStore(this.objectStoreName)

      const request = objectStore.delete(key)

      request.onsuccess = (_event) => {
        resolve(key)
      }

      request.onerror = (event) => {
        reject(event.target.error)
      }
    })
  }

  clear() {
    return new Promise((resolve, reject) => {
      if (!this.database.db) {
        throw new IDBConnectionError('IndexedDB is not open.')
      }

      const transaction = this.database.db.transaction(
        this.objectStoreName,
        'readwrite'
      )
      const objectStore = transaction.objectStore(this.objectStoreName)

      const request = objectStore.clear()

      request.onsuccess = (_event) => {
        resolve()
      }

      request.onerror = (event) => {
        reject(event.target.error)
      }
    })
  }
}

export default Database
