const dbName = 'fd_relation_schema'
const version = 1
const objectStores = [
  {
    name: 'schema_datas',
    options: { keyPath: 'id', autoIncrement: true },
  },
]

import Database from './util/Database'

const database = new Database(dbName, version, objectStores)

;(async () => {
  await database.open()
})()

export default database
