import express from 'express';

import fichaRoutes from './routes/fichaRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de fichas
app.use('/api/fichas', fichaRoutes);

export default app;
