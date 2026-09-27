import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

    export const registrarUsuario = async (nombre, email, password) => {
        try {
            // Verificar si el correo ya existe
            const [usuarios] = await pool.query(
                'SELECT id FROM usuarios WHERE email = ?',
                [email]
            );

            if (usuarios.length > 0) {
                throw new Error('El correo ya está registrado');
            }

            // Encriptar contraseña
            const passwordHash = await bcrypt.hash(password, 10);

            // Guardar usuario
            const [result] = await pool.query(
                `INSERT INTO usuarios (nombre, email, password)
                VALUES (?, ?, ?)`,
                [nombre, email, passwordHash]
            );

            return {
                id: result.insertId,
                nombre,
                email
            };

        } catch (error) {
            throw new Error(error.message);
        }
    };

    export const iniciarSesion = async (email, password) => {
        try {
            // Buscar usuario por correo
            const [usuarios] = await pool.query(
                'SELECT * FROM usuarios WHERE email = ?',
                [email]
            );

            if (usuarios.length === 0) {
                throw new Error('Correo o contraseña incorrectos');
            }

            const usuario = usuarios[0];

            // Comparar contraseña
            const passwordCorrecta = await bcrypt.compare(
                password,
                usuario.password
            );

            if (!passwordCorrecta) {
                throw new Error('Correo o contraseña incorrectos');
            }

            // Crear token JWT
            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
                }
            );

            return {
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: usuario.email
                },
                token
            };

        } catch (error) {
            throw new Error(error.message);
        }
    };