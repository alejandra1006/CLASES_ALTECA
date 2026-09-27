import { Router } from 'express';

import { getFichas, createFicha } from '../controllers/fichaControllers.js';
import verificarToken from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, getFichas);

router.post('/', verificarToken, createFicha);

export default router;