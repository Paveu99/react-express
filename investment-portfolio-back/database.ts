import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';

sqlite3.verbose();

export const dbPromise = open({
    filename: './database.db',
    driver: sqlite3.Database
}).then((db) => {
    console.log('Connected to the SQLite database.');
    return db;
}).catch((err) => {
    console.error('Failed to connect to the database:', err.message);
    throw err;
});
