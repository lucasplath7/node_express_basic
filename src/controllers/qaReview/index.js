import { knex } from '../../database/index.js';
import IncidentController from '../incident/index.js';

async function createQaReview({
  incidentId,
  reviewType
}) {
  await knex('qaReview')
    .insert({
      incidentId,
      reviewType
    });

  await knex('incident')
    .update({
      status: reviewType
    })
    .where('id', incidentId)

  const incident = await IncidentController.fetchIncident(incidentId)
    .then(inc => {
      console.log('inc: ', inc)
      return inc;
    });

  return incident;
}

async function updateQaReview({
  incidentId,
  reviewType,
  decision
}) {
  const statusMap = {
    discoveryQaReview: {
      next: 'actionPlan',
      previous: 'discovery',
    },
    actionPlanQaReview: {
      next: 'implementation',
      previous: 'actionPlan',
    },
    implementationQaReview: {
      next: 'closed',
      previous: 'implementation'
    }

  }

  const newStatus = decision === 'approve' ? statusMap[reviewType].next : statusMap[reviewType].previous;

  await knex('incident')
    .update({status: newStatus})
    .where('id', incidentId)
    .then(result => result[0]);

  const incident = await IncidentController.fetchIncident(incidentId)
    .then(inc => {
      console.log('inc: ', inc)
      return inc;
    });

  return incident;
}

async function fetchQaReview(id) {
  const qaReview = knex.select('*')
    .from('qaReview')
    .where({id, decision: null})
    .then(result => result[0]);
  
  return qaReview;
}

export default {
  updateQaReview,
  fetchQaReview,
  createQaReview
}