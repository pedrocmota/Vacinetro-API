import sqlite from 'sqlite-sync'
import path from 'path'

const DB = {
  
  aberto: false,

  open: () => {
    sqlite.connect(path.join(__dirname, '../database/database.db'));
    DB.aberto = true
  },

  close: () => {
    sqlite.close()
  },

  query: (query:string) => {
    if(!DB.aberto) DB.open()
    return sqlite.run(query)
  }
}

export default DB