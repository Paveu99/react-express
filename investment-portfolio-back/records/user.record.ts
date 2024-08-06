import { Database } from "sqlite";
import { UserEntity } from "../types";
import { dbPromise } from "../database";
import { genSalt, hash, compare } from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserRecord implements UserEntity {
    public id?: string;
    public username: string;
    public password: string;
    public balance: number;

    constructor(obj: UserRecord) {
        this.id = obj.id;
        this.username = obj.username;
        this.password = obj.password;
        this.balance = obj.balance;
    }

    static async listAll(): Promise<UserRecord[] | null> {
        try {
            const db: Database = await dbPromise;
            const users: UserRecord[] = await db.all<UserRecord[]>('SELECT * FROM users');
            return users.length === 0 ? null : users.map(obj => new UserRecord(obj));
        } catch (err) {
            console.error('Error listing all users:', err.message);
            return null;
        }
    }

    static async getOneByUsername(username: string): Promise<UserRecord | null> {
        try {
            const db: Database = await dbPromise;
            const user = await db.get<UserRecord>('SELECT * FROM users WHERE username = ?', [username]);
            return user ? new UserRecord(user) : undefined;
        } catch (err) {
            console.error(`Error getting user by username ${username}:`, err.message);
            return null;
        }
    }

    static async getOneById(user_id: string): Promise<UserRecord | null> {
        try {
            const db: Database = await dbPromise;
            const user = await db.get<UserRecord>('SELECT * FROM users WHERE id = ?', [user_id]);
            return user ? new UserRecord(user) : undefined;
        } catch (err) {
            console.error(`Error getting user by id ${user_id}:`, err.message);
            return null;
        }
    }

    async insertOne(): Promise<string | null> {
        try {
            if (!this.id) {
                this.id = uuid();
            }
            const db: Database = await dbPromise;
            const saltRounds = 10;
            const salt = await genSalt(saltRounds);
            this.password = await hash(this.password, salt);

            await db.run(
                'INSERT INTO users (id, username, password, balance) VALUES (?, ?, ?, ?)',
                [this.id, this.username, this.password, this.balance]
            );

            return this.id;
        } catch (err) {
            console.error('Error inserting new user:', err.message);
            return null;
        }
    }

    async updateBalance(newBalance: number): Promise<void> {
        try {
            const db: Database = await dbPromise;
            await db.run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, this.id]);
            this.balance = newBalance;
        } catch (err) {
            console.error(`Error updating balance for user ${this.id}:`, err.message);
        }
    }

    async comparePassword(password: string): Promise<boolean> {
        try {
            return await compare(password, this.password);
        } catch (err) {
            console.error('Error comparing password:', err.message);
            return false;
        }
    }
}
