import express from 'express';
const router = express.Router();

import { general, addUser, addUsers, getUsers, updateScore, getUser } from '../controller/softskill.js';

router.get('/', general);
router.post('/add-user', addUser);
router.post('/add-users', addUsers);
router.get('/get-users', getUsers);
router.get('/get-user/:id', getUser);
router.post('/update-score', updateScore);

export default router;