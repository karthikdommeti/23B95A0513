import express from 'express';
import { createShortUrl, getUrlStats } from '../controllers/urlController.js';

const router = express.Router();

router.post('/', createShortUrl);
router.get('/:code', getUrlStats);

export default router;
