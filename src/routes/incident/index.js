import express from 'express';

import IncidentController from '../../controllers/incident/index.js';

const router = express.Router();

router.get('/', async(req, res) => {
  const incidents = await IncidentController.fetchAllIncidents();
  res.send(incidents);
});

router.get('/:incidentId', async(req, res) => {
  const { params } = req;

  const incident = await IncidentController.fetchIncident(params.incidentId);
  res.send(incident);
});

router.post('/', async(req, res) => {
  const { body } = req;
  const incident = await IncidentController.createIncident(body);
  res.send(incident);
});

router.put('/', async(req, res) => {
  const { body } = req;
  const incident = await IncidentController.updateIncident(body);
  res.send(incident);
});

router.delete('/:incidentId', async(req, res) => {
  const { params } = req;

  const incident = await IncidentController.deleteIncident(params.incidentId);

  res.send(incident);
});

export default router;
