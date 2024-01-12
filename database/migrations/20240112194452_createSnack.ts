import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Snacks', (table)=> {
    table.increments('snackID').primary(),
    table.string('Name'),
    table.string('Description')
    table.date('dateTime').defaultTo(knex.fn.now())
    table.binary('isDiet')
    table.uuid('userID').references('users.userID')
  })
}


export async function down(knex: Knex): Promise<void> {
}

