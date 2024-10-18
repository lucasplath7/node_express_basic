import { knex } from '../../database/index.js';

async function createIncident({
  name,
  description,
  type
}) {
  const incidentId = await knex('incident')
    .insert({
      status: 'discovery',
      name,
      description,
      type
    })
    .then(result => result[0]);

  const newIncident = await fetchIncident(incidentId)
    .then(inc => {
      return inc;
    });
  
  await knex('discovery')
    .insert({
      id: incidentId
    });

  await knex('actionPlan')
    .insert({
      id: incidentId
    });

  await knex('implementation')
    .insert({
      id: incidentId
    });

  return newIncident;
}

async function updateIncident({
  id,
  name,
  description,
  type
}) {
  const incidentId = await knex('incident')
    .update({
      name,
      description,
      type
    })
    .where('id', id)
    .then(result => result[0]);

  const incident = await fetchIncident(id)
    .then(inc => {
      console.log('inc: ', inc)
      return inc;
    });

  return incident;
}

async function fetchIncident(id) {
  const incident = knex.select('*')
    .from('incident')
    .where({id})
    .then(result => result[0]);
  
  return incident;
}

async function fetchAllIncidents() {
  const incidents = await knex.select('*')
    .from('incident');
  // return incidents.map(inc => {
  //   return {
  //     id: inc.id,
  //     name: inc.name,
  //     description: inc.description,
  //     newprop: 'new'
  //   }
  // })
  return incidents;
}

async function deleteIncident(incidentId) {
  const deletedIncident = await fetchIncident(incidentId)
    .then(inc => {
      return inc;
    });

  await knex('incident')
    .where({ id: incidentId })
    .del();
  
  await knex('discovery')
    .where({ id: incidentId })
    .del();

  await knex('actionPlan')
    .where({ id: incidentId })
    .del();

  await knex('implementation')
    .where({ id: incidentId })
    .del();

  return deletedIncident;
}

export default {
  createIncident,
  fetchAllIncidents,
  fetchIncident,
  deleteIncident,
  updateIncident
}