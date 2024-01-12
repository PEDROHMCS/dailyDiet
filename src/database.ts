import {knex as setKnex, Knex} from 'knex'

export const config : Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './database/data.db',
    
  },
  migrations: {
    directory: './database/migrations',
    extension: 'ts'
  }
}


export const knex = setKnex(config)