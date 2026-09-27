import pool from '../config/db.js';

export const obtenerTodasLasFichas = async () => {
    try {
        const [result] = await pool.query(
            'SELECT * FROM fichas'
        );

        return result;

    } catch (error) {
        throw new Error(
            'Error al obtener las fichas: ' + error.message
        );
    }
};

export const crearFicha = async ({ numeroFicha, programa }) => {
    try {
        const [result] = await pool.query(
            'INSERT INTO fichas (numeroFicha, programa) VALUES (?, ?)',
            [numeroFicha, programa]
        );

        return {
            id: result.insertId,
            numeroFicha,
            programa
        };

    } catch (error) {
        throw new Error(
            'Error al guardar la ficha: ' + error.message
        );
    }
};
