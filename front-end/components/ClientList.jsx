// components/ClientList.js

import React, { useState } from 'react';
import axios from 'axios';
import styleClientList from './ClientList.module.css'

const ClientList = () => {

    const [dataNewClient, setDataNewClient] = useState({
        nombre: '', 
        apellidos: '',
        comida: '',
        bebida: ''
    })
    const [serverMessage, setServerMessage] = useState('');


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
                setServerMessage('El cliente y su desayuno favorito ha sido añadido correctamente.');
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
                setServerMessage('Ha habido un error al enviar los datos.');
            });
    };

    return (
        <div>
            <div className={styleClientList.box}>
                Nuevo usuario:
                <input placeholder='Nombre' id='nombre' onChange={handleChange} value={dataNewClient.nombre} ></input>
                <input placeholder='Apellidos' id='apellidos' onChange={handleChange} value={dataNewClient.apellidos}></input>
                <br></br>
                Desayuno favorito:
                <input placeholder='Comida' id='comida' onChange={handleChange} value={dataNewClient.comida}></input>
                <input placeholder='Bebida' id='bebida' onChange={handleChange} value={dataNewClient.bebida}></input>

                <input type='submit' value='Registrar' onClick={handleSubmit} className={styleClientList.buttonGradient}></input>
                {serverMessage && <p className={styleClientList.message}>{serverMessage}</p>}
            </div>
        </div>
    );
};

export default ClientList;
