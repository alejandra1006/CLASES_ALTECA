import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: 'Token no proporcionado'
            });
        }

        const [tipo, token] = authHeader.split(' ');

        if (tipo !== 'Bearer' || !token) {
            return res.status(401).json({
                error: 'Formato de token inválido'
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guardamos los datos del usuario
        // para utilizarlos posteriormente
        req.usuario = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            error: 'Token inválido o expirado'
        });
    }
};

export default verificarToken;