import express from 'express';

import ImplementationController from '../../controllers/implementation/index.js';

const router = express.Router();

router.get('/:incidentId', async(req, res) => {
  const { params } = req;

  const implementation = await ImplementationController.fetchImplementation(params.incidentId);
  res.send(implementation);
});

router.put('/', async(req, res) => {
  const { body } = req;
  console.log('body: ', body)
  const implementation = await ImplementationController.updateImplementation(body);
  res.send(implementation);
});

export default router;
