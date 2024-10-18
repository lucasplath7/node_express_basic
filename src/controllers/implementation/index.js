import { knex } from '../../database/index.js';

async function updateImplementation(body) {
  const { id, ...rest } = body

  const incidentId = await knex('implementation')
    .update({...rest})
    .where('id', id)
    .then(result => result[0]);

  const implementation = await fetchImplementation(id)
    .then(imp => {
      return imp;
    });

  return implementation;
}

async function fetchImplementation(id) {
  const implementation = knex.select('*')
    .from('implementation')
    .where({id})
    .then(result => result[0]);
  
  return implementation;
}

export default {
  updateImplementation,
  fetchImplementation
}