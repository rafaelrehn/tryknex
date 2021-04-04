import * as Knex from "knex";
import { Users } from "../app/model/users.model";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex<Users>("users").insert([
        { username: 'admin', password: 'admin', email: 'admin@admin.com'},
    ]);
};
