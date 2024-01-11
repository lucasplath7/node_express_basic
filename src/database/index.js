import { faker } from '@faker-js/faker';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import knex from 'knex';

const filepath = "./basic.db";

function createDatabase() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    console.log("Connection with SQLite has been established");
    return db;
  }
}


function createTable(db) {
  db.exec(`
    CREATE TABLE users
    (
      id   VARCHAR(50) PRIMARY KEY NOT NULL,
      first_name   VARCHAR(50) NOT NULL,
      last_name   VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL
    );
  `);

  db.run(
    `INSERT INTO users (id, first_name, last_name, email) VALUES (?, ?, ?, ?)`,
    [faker.string.uuid(), 'test_first_name', 'test_last_name', 'test_email@email.com'],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
  );
}

const knexConnection = (() => {
  if (!fs.existsSync(filepath)) {
    createDatabase();
  }

  return knex({
    client: 'sqlite3',
    connection: {
      filename: filepath,
    }
  })
}
)();

export {
  knexConnection as knex
};