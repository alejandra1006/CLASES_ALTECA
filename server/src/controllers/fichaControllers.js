import * as fichaService from '../services/fichaServices.js';

export const getFichas = async (req, res) => {
    try {
        const fichas = await fichaService.obtenerTodasLasFichas();
        res.json(fichas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createFicha = async (req, res) => {
    try {
        const nuevaFicha = await fichaService.crearFicha(req.body);
        res.status(201).json(nuevaFicha);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};