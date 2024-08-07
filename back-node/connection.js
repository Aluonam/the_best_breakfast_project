
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'the_best_breakfast' // Reemplaza con el nombre de tu base de datos
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos.', err.stack);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida');
});

module.exports = connection;

connection.end