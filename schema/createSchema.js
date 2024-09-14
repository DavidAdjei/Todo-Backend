const mysql = require('mysql2/promise');
const { createDb, useDb, createUserTable, createTodoTable } = require('./schema');

exports.createSchema = async () => {
    console.log("Connecting to MySQL with the following details:");
    console.log("HOST:", process.env.HOST);
    console.log("USER:", process.env.USER);
    console.log("PASSWORD:", process.env.PASSWORD ? '********' : 'Not provided');
    
    const db = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD
    });

    try {
        await db.query(createDb);
        await db.query(useDb);
        await db.query(createUserTable);
        await db.query(createTodoTable);

        console.log("Schema created");
    } catch (error) {
        console.error('Schema creation failed', error);
    } finally {
        await db.end();
    }
};
