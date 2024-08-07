// components/ClientList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientList = () => {

    const [dataNewClient, setDataNewClient] = useState({
        nombre: '', 
        apellidos: '',
        comida: '',
        bebida: ''
    })


    const handleChange = (e) => {
        const { id, value } = e.target;
        setDataNewClient((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = () => {
        console.log('datos para enviar: ', dataNewClient)
        axios.post('http://localhost:3001/api/addclient', dataNewClient)
            .then(response => {
                console.log('Datos enviados:', response.data);
                //limpiar form una vez se han enviado los datos:
                setDataNewClient({
                    nombre: '',
                    apellidos: '',
                    comida: '',
                    bebida: ''
                });
            })
            .catch(error => {
                console.error('Error al enviar datos:', error);
            });
    };

    return (
        <div>
            <div  style={{display: 'flex', flexDirection: 'column'}}>
                Nuevo usuario:
                <input placeholder='Nombre' id='nombre' onChange={handleChange} value={dataNewClient.nombre} ></input>
                <input placeholder='Apellidos' id='apellidos' onChange={handleChange} value={dataNewClient.apellidos}></input>
                <br></br>
                Desayuno favorito:
                <input placeholder='Comida' id='comida' onChange={handleChange} value={dataNewClient.comida}></input>
                <input placeholder='Bebida' id='bebida' onChange={handleChange} value={dataNewClient.bebida}></input>

                <input type='submit' value='Registrar' onClick={handleSubmit}></input>
            </div>
        </div>
    );
};

export default ClientList;
