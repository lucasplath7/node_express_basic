import { knex } from '../../database/index.js';

async function updateActionPlan(body) {
  const { id, ...rest } = body

  const incidentId = await knex('actionPlan')
    .update({...rest})
    .where('id', id)
    .then(result => result[0]);

  const actionPlan = await fetchActionPlan(id)
    .then(ap => {
      return ap;
    });

  return actionPlan;
}

async function fetchActionPlan(id) {
  const actionPlan = knex.select('*')
    .from('actionPlan')
    .where({id})
    .then(result => result[0]);
  
  return actionPlan;
}

export default {
  updateActionPlan,
  fetchActionPlan
}