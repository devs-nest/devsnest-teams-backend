import express from 'express';
const router = express.Router();

import { addAdmin, checkPassword } from '../controller/admin.js';

router.post('/add-admin', addAdmin);
router.post('/check-password', checkPassword);

export default router;