import express from 'express';

import DiscoveryController from '../../controllers/discovery/index.js';

const router = express.Router();

router.get('/:incidentId', async(req, res) => {
  const { params } = req;

  const discovery = await DiscoveryController.fetchDiscovery(params.incidentId);
  res.send(discovery);
});

router.put('/', async(req, res) => {
  const { body } = req;
  console.log('body: ', body)
  const discovery = await DiscoveryController.updateDiscovery(body);
  res.send(discovery);
});

export default router;
