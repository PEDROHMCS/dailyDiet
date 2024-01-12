import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('userID').primary();
    table.string('username')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}

