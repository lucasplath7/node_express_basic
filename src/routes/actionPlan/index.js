import express from 'express';

import ActionPlanController from '../../controllers/actionPlan/index.js';

const router = express.Router();

router.get('/:incidentId', async(req, res) => {
  const { params } = req;

  const actionPlan = await ActionPlanController.fetchActionPlan(params.incidentId);
  res.send(actionPlan);
});

router.put('/', async(req, res) => {
  const { body } = req;
  console.log('body: ', body)
  const actionPlan = await ActionPlanController.updateActionPlan(body);
  res.send(actionPlan);
});

export default router;
