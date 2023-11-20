'use strict';

const mysql = require('mysql2/promise');

module.exports.submit = async (event) => {
  try {
    // Parse JSON body
    const requestBody = JSON.parse(event.body);

    // Access values
    const id_personaje = requestBody.id_personaje;
    const nombre = requestBody.nombre;
    const altura = requestBody.altura;
    const peso = requestBody.peso;
    const color_cabello = requestBody.color_cabello;
    const color_piel = requestBody.color_piel;
    const color_ojo = requestBody.color_ojo;
    const fecha_nacimiento = requestBody.fecha_nacimiento;
    const genero = requestBody.genero;
    const planeta_origen = requestBody.planeta_origen;
    const peliculas = requestBody.peliculas;
    const especie = requestBody.especie;
    const vehiculos = requestBody.vehiculos;
    const naves = requestBody.naves;
    const creado = requestBody.creado;
    const editado = requestBody.editado;
    const url = requestBody.url;

    // Connection settings
    const connection = await mysql.createConnection({
      host: '18.205.168.191',
      user: 'admin',
      password: 'passworddev',
      database: 'db-softtek'
    });

    // Insert query
    const [rows, fields] = await connection.execute(
      'INSERT INTO personajes (id_personaje, nombre, altura, peso, color_cabello, color_piel, color_ojo, fecha_nacimiento, genero, planeta_origen, ' +
      'peliculas, especie, vehiculos, naves, creado, editado, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id_personaje, nombre, altura, peso, color_cabello, color_piel, color_ojo, fecha_nacimiento, 
        genero, planeta_origen, peliculas, especie, vehiculos, naves, creado, editado, url]
    );

    // Close aws connection
    await connection.end();

    // Return Successful response
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body: JSON.stringify({
        message: 'Everything is working',
      }),
    };

    return response;

  } catch (error) {
    // Catch error
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Error processing the request',
        error: error.message,
      }),
    };
  }
};