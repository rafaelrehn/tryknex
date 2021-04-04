import Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('users', (table)=> {
       table.increments('id');
       table.string('username', 255).notNullable();
       table.string('password', 255).notNullable();
       table.string('email', 255).notNullable();
       table.dateTime('criado_em').defaultTo(new Date().toISOString());
       table.dateTime('atualizado_em').defaultTo(new Date().toISOString());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("users");
}

