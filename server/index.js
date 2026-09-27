import app from './src/app.js';

const PORT =process.env.PORT || 3000;

// Inicia el servidor y escucha en el puerto definido
app.listen(PORT, () => {
    // Envia un mensaje de confirmacion por terminal para informar que esta funcionado el servidor
    console.log(`servidor de clase corriendo en http://localhost:${PORT}`);
});
