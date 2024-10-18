import express from 'express';

import UserRoutes from './user/index.js';
import IncidentRoutes from './incident/index.js';
import DiscoveryRoutes from './discovery/index.js';
import ActionPlanRoutes from './actionPlan/index.js';
import ImplementationRoutes from './implementation/index.js';
import QaReviewRoutes from './qaReview/index.js';

const router = express.Router();

router.use('/api/user', UserRoutes);
router.use('/api/incident', IncidentRoutes);
router.use('/api/discovery', DiscoveryRoutes);
router.use('/api/actionPlan', ActionPlanRoutes);
router.use('/api/implementation', ImplementationRoutes);
router.use('/api/qaReview', QaReviewRoutes);

export default router;