import { knex } from '../../database/index.js';

async function updateDiscovery(body) {
  const { id, ...rest } = body
  console.log('rest', rest)
  const incidentId = await knex('discovery')
    .update({...rest})
    .where('id', id)
    .then(result => result[0]);

  const discovery = await fetchDiscovery(id)
    .then(disc => {
      console.log('disc: ', disc)
      return disc;
    });

  return discovery;
}

async function fetchDiscovery(id) {
  const discovery = knex.select('*')
    .from('discovery')
    .where({id})
    .then(result => result[0]);
  
  return discovery;
}

export default {
  updateDiscovery,
  fetchDiscovery
}