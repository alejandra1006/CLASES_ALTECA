import express from 'express'; // import the Express library to create a web server. 
const app = express (); // crear una instancia de la aplicacion Express.
const PORT = 3000; // define el puerto en el que se ejecutara el servidor.

// Middleware para analizar el cuerpo de las solicitudes entrantes como JSON
app.use(express.json());

// simular registros de una base de datos con un array de objetos.
let fichasSena = [
    {id: 1, numeroFicha: "2874012", programa: "ADSO", tieneAlerta: false  },
    {id: 2, numeroFicha: "2901345", programa: "ADSO", tieneAlerta: true }
];

// Definir una ruta GET para el endpoint '/api/fichas'.
app.get('/api/fichas', (req, res) => {
    // muestra en consola que el servicio se esta consultando
    console.log("¡han consultado el servicio GET de fichas!");

    // Envia la respuesta final al cliente con el codigo de estado HTTP 200 (Exito / OK) y los datos estructurados
    res.status(200).json({
        mensaje: "lista de fichas recuperada con exito",
        total: fichasSena.length,
        datos: fichasSena

    });
});

// Definir una ruta POST para el endpoint '/api/fichas'.
app.post('/api/fichas', (req, res) => {
    // mensaje por consola para confirmar datos enviados desde json
    console.log("¡han enviado datos al servicio POST!", req.body);

    //crea un nuevo objeto estructurado tomando de forma dinamica las propiedades 'numeroFicha' y 'programa'
    const nuevaFicha = {
        id: fichasSena.length + 1, // Calcula el siguiente id sumando 1 al tamaño actual del arreglo
        numeroFicha: req.body.numeroFicha,
        programa: req.body.programa,
        tieneAlerta: false // por defecto, toda ficha nueva inicia limpia de alertas
    };

    // inserta la nueva ficha recien armada al final de nuestro arreglo en memoria
    fichasSena.push(nuevaFicha);

    // responde al cliente con el codigo de estado HTTP 201 (Creado con exito) y muestra el objeto creado
        res.status(201).json({
        mensaje: "Ficha registrada correctamente en el sistema",
        fichaCreada: nuevaFicha
    });
});

// Inicia el servidor y escucha en el puerto definido
app.listen(PORT, () => {
    // Envia un mensaje de confirmacion por terminal para informar que esta funcionado el servidor
    console.log(`servidor de clase corriendo en http://localhost:${PORT}`);
});
