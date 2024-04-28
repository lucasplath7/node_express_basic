import express from 'express';

import UserController from '../../controllers/user/index.js';

const router = express.Router();

router.get(
  '/',
  async (req, res) => {
    const { 
      params,
      query,
      body,
    } = req;

    console.log('params: ', params);
    console.log('query: ', query);
    console.log('body: ', body);

    const users = await UserController.fetchAllUsers();
    setTimeout(() => {
      res.send(users);
    }, 1000);
  }
)

router.get(
  '/:id',
  async (req, res) => {
    const { 
      params,
    } = req;

    const userData = await UserController.fetchUser(params.id);
    setTimeout(() => {
      res.send(userData);
    }, 1000);
  }
)

router.post(
  '/',
  async (req, res) => {
    console.log('req body: ', req.body)
    const userId = await UserController.createUser(req.body);

    setTimeout(() => {
      res.send(userId);
    }, 1000)
  }
)

router.delete(
  '/:id',
  async (req, res) => {
    await UserController.deleteUser(req.params);

    res.send(true);
  }
)

export default router;