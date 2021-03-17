import * as Knex from "knex";
import { Users } from "../app/model/users.model";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex<Users>("users").insert([
        { first_name: 'admin', last_name: 'admin', password: 'admin'},
        { first_name: 'Rafael', last_name: 'Rehn', password: 'admin'},
        { first_name: 'Victor', last_name: 'Navorski', password: 'admin'},
    ]);
};
