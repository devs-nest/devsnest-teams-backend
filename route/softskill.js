import express from 'express';
const router = express.Router();

import { general, addUser, addUsers, getUsers } from '../controller/softskill.js';

router.get('/', general);
router.post('/add-user', addUser);
router.post('/add-users', addUsers);
router.get('/get-users', getUsers);

export default router;