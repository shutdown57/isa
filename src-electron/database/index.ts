import { open, Database } from 'sqlite'
import { Database as SQLITE3, Statement } from 'sqlite3'

export class DB {
  public db!: Database<SQLITE3, Statement>

  async initialize (): Promise<void> {
    this.db = await open({ filename: DB.dbName, driver: SQLITE3 })
  }

  static get dbName () {
    return process.env.DATABASE || 'isa.db'
  }
}
