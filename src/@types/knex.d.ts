import {Knex} from "knex"

declare module 'knex/types/tables' {
  export interface Tables{
    Snacks: {
      snackID?: number,
      Name: string,
      Description: string,
      isDiet: boolean,
      userID: string
    }
  }
}