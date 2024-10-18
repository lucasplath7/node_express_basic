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
      createIncidentTable(db);
      createDiscoveryTable(db);
      createActionPlanTable(db);
      createImplementationTable(db);
      createQaReviewTable(db);
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

function createIncidentTable(db) {
  db.exec(`
    CREATE TABLE incident
    (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      status  VARCHAR(256) NOT NULL,
      name  VARCHAR(256) NOT NULL,
      description  VARCHAR(256) NOT NULL,
      type  VARCHAR(256) NOT NULL
    );
  `);
}

function createDiscoveryTable(db) {
  db.exec(`
    CREATE TABLE discovery
    (
      id   INTEGER PRIMARY KEY NOT NULL,
      impactDescription  VARCHAR(256),
      impactedParties  VARCHAR(256),
      lifeCyclePhase  VARCHAR(256),
      primaryCause  VARCHAR(256),
      causeDescription  VARCHAR(256),
      dataElementsImpacted  VARCHAR(256)
    );
  `);
}

function createActionPlanTable(db) {
  db.exec(`
    CREATE TABLE actionPlan
    (
      id   INTEGER PRIMARY KEY NOT NULL,
      fixType  VARCHAR(256),
      regulatoryIssue  VARCHAR(256),
      enhancementRationale  VARCHAR(256),
      fundingRequired  VARCHAR(256)
    );
  `);
}

function createImplementationTable(db) {
  db.exec(`
    CREATE TABLE implementation
    (
      id   INTEGER PRIMARY KEY NOT NULL,
      resolutionPath  VARCHAR(256),
      resolutionDescription  VARCHAR(256),
      actionsTaken  VARCHAR(256),
      approvals  VARCHAR(256)
    );
  `);
}

function createQaReviewTable(db) {
  db.exec(`
    CREATE TABLE qaReview
    (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      incidentId INTEGER NOT NULL,
      reviewType  VARCHAR(256) NOT NULL,
      decision  VARCHAR(256)
    );
  `);
}

const knexConnection = (() => {
  if (!fs.existsSync(filepath)) {
    createDatabase();
  }

  return knex({
    client: 'sqlite3',
    connection: {
      filename: filepath,
    },
    useNullAsDefault: true,
  })
}
)();

export {
  knexConnection as knex
};