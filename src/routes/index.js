import express from 'express';

import UserRoutes from './user/index.js';

const router = express.Router();

router.use('/api/user', UserRoutes);

export default router;