import express from 'express';

import QaReviewController from '../../controllers/qaReview/index.js';

const router = express.Router();

router.get('/:incidentId', async(req, res) => {
  const { params } = req;

  const qaReview = await QaReviewController.fetchQaReview(params.incidentId);
  res.send(qaReview);
});

router.post('/', async(req, res) => {
  const { body } = req;
  const incident = await QaReviewController.createQaReview(body);
  res.send(incident);
});

router.put('/', async(req, res) => {
  const { body } = req;
  console.log('body: ', body)
  const qaReview = await QaReviewController.updateQaReview(body);
  res.send(qaReview);
});

export default router;
