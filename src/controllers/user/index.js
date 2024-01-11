import { knex } from '../../database/index.js';
import { v4 as uuidv4 } from 'uuid';

async function fetchAllUsers() {
  const users = knex.select('*')
    .from('users');

  return users;
}

async function fetchUser(id) {
  const user = knex.select('*')
    .from('users')
    .where({id});
  
  return user;
}

async function createUser({
  firstName,
  lastName,
  email
}) {
  const id = uuidv4();

  await knex('users')
    .insert({
      id,
      first_name: firstName,
      last_name: lastName,
      email,
    });

  return id;
}

async function deleteUser({ id }) {
  return knex('users')
    .where({ id })
    .del();
}

export default {
  createUser,
  deleteUser,
  fetchAllUsers,
  fetchUser,
}