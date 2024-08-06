import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { genSalt, hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

sqlite3.verbose();

const dbPromise = open({
    filename: './database.db',
    driver: sqlite3.Database
});

async function init() {
    const db = await dbPromise;

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            balance REAL NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS investments (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            name TEXT NOT NULL,
            quantity REAL NOT NULL,
            price REAL NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        );
    `);

    const saltRounds = 10;

    const users = [
        { username: 'user1', password: 'password1', balance: 1000.00 },
        { username: 'user2', password: 'password2', balance: 2000.00 }
    ];

    for (const user of users) {
        const salt = await genSalt(saltRounds);
        const hashedPassword = await hash(user.password, salt);
        const userId = uuidv4();
        await db.run(
            `INSERT INTO users (id, username, password, balance) VALUES (?, ?, ?, ?)`,
            [userId, user.username, hashedPassword, user.balance]
        );
    }

    console.log('Database initialized and users added.');
}

init().catch((err) => {
    console.error('Failed to initialize the database:', err.message);
});
