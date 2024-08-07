
const express = require('express');
const app = express();
const connection = require('./connection'); 
// import connection from './connection.js';
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors())

// Ruta para obtener todos los clientes
// app.get('/api/client', (req, res) => {
//     connection.query('SELECT * FROM client', (err, results) => {
//         if (err) {
//             console.error('Error al obtener clientes:', err);
//             res.status(500).json({ error: 'Error interno del servidor' });
//             return;
//         }
//         res.json(results);
//     });
// });


// app.get('/api/client/names', (req, res) => {
//     connection.query('SELECT name, lastname FROM client', (err, results) => {
//         if (err) {
//             console.error('Error al obtener nombres y apellidos:', err);
//             res.status(500).json({ error: 'Error interno del servidor' });
//             return;
//         }
//         res.json(results);
//     });
// });

// app.get('/api/breakfast', (req, res) => {
//     connection.query('SELECT * FROM breakfast', (err, results) => {
//         if (err) {
//             console.error('Error al obtener nombres y apellidos:', err);
//             res.status(500).json({ error: 'Error interno del servidor' });
//             return;
//         }
//         res.json(results);
//     });
// });


// app.delete('/api/delclient:id', (req, res) => {
//     const clientId = req.params.id;
//     const query = 'DELETE FROM client WHERE id_cliente = ?';

//     connection.query(query, [clientId], (err, results) => {
//         if (err) {
//            throw err;
//         } else{
//             console.log("Datos eliminados correctamente")
//         }
//     });
// });


// app.post('/api/addclient', (req, res) => {

//     const { nombre, apellidos, comida, bebida } = req.body;

//     const insertClientQuery = 'INSERT INTO client (name, lastname) VALUES  (?, ?)';
//     connection.query( insertClientQuery, [nombre || '', apellidos || ''], (err, results)=>{
//         if(err){  
//             console.error('Error al insertar cliente:', err);
//             res.status(500).json({ error: 'Error interno del servidor' });
//             return;
//         } else{
//                 console.log("Datos insertados correctamente")
//             }
//     })
//     const clientId = results.insertId; // Obtiene el id del cliente insertado
    
//     const insertBreakfastQuery = 'INSERT INTO breakfast (id_client, food, drink) VALUES (?, ?, ?)';
//     connection.query(insertBreakfastQuery, [clientId, comida || '', bebida || ''], (err, results) => {
//         if (err) {
//             console.error('Error al insertar desayuno:', err);
//             res.status(500).json({ error: 'Error interno del servidor' });
//             return;
//         }

//         res.status(201).json({ message: 'Cliente y desayuno agregados exitosamente' });
//     });

//     console.log(newData)
//     res.json({ message: 'Datos recibidos correctamente' });
// });







app.post("/api/addclient", (req, res) => {
    const { nombre, apellidos, comida, bebida } = req.body;

    // Inserción en la tabla client
    const insertClientQuery = 'INSERT INTO client (name, lastname) VALUES (?, ?)';
    connection.query(insertClientQuery, [nombre || '', apellidos || ''], (err, results) => {
        if (err) {
            console.error('Error al insertar cliente:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        const clientId = results.insertId; // Obtiene el id del cliente insertado

        // Inserción en la tabla breakfast con la referencia del cliente
        const insertBreakfastQuery = 'INSERT INTO breakfast (id_client, food, drink) VALUES (?, ?, ?)';
        connection.query(insertBreakfastQuery, [clientId, comida || '', bebida || ''], (err, results) => {
            if (err) {
                console.error('Error al insertar desayuno:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }

            res.status(201).json({ message: 'Cliente y desayuno agregados exitosamente' });
        });
    });
});









// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Servidor backend iniciado en el puerto ${PORT}`);
// });

app.use(express.static("front-end"))
app.listen(PORT, () => {
    console.log(`Servidor backend iniciado en el puerto ${PORT}`);
});