import * as authService from '../services/authServices.js';

export const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                error: 'Todos los campos son obligatorios'
            });
        }

        const usuario = await authService.registrarUsuario(
            nombre,
            email,
            password
        );

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'El correo y la contraseña son obligatorios'
            });
        }

        const resultado = await authService.iniciarSesion(
            email,
            password
        );

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            ...resultado
        });

    } catch (error) {
        res.status(401).json({
            error: error.message
        });
    }
};