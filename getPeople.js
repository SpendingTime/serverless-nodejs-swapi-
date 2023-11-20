'use strict';

const mysql = require('mysql2/promise');

module.exports.getPeople = async (event) => {

    try {
        const id = event.pathParameters.id;

        // Connection settings
        const connection = await mysql.createConnection({
            host: '18.205.168.191',
            user: 'admin',
            password: 'passworddev',
            database: 'db-softtek'
        });

        // Select query
        const [rows, fields] = await connection.execute('SELECT * FROM personajes WHERE id_personaje = ?', [id]);

        // Close aws connection
        await connection.end();

        // Return Successful response with the retrieved data
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: rows.length > 0 ? JSON.stringify(rows[0]) : '{}'
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