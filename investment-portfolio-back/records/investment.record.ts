import { Database } from "sqlite";
import { InvestmentEntity } from "../types";
import { dbPromise } from "../database";
import { v4 as uuid } from "uuid";

export class InvestmentRecord implements InvestmentEntity {
    public id?: string;
    public name: string;
    public quantity: number;
    public price: number;
    public user_id: string;

    constructor(obj: InvestmentRecord) {
        this.id = obj.id;
        this.name = obj.name;
        this.quantity = obj.quantity;
        this.price = obj.price;
        this.user_id = obj.user_id;
    }

    static async listAll(): Promise<InvestmentRecord[] | null> {
        try {
            const db: Database = await dbPromise;
            const investments: InvestmentRecord[] = await db.all<InvestmentRecord[]>('SELECT * FROM investments');
            return investments.length === 0 ? null : investments.map(obj => new InvestmentRecord(obj));
        } catch (err) {
            console.error('Error listing all investments:', err.message);
            return null;
        }
    }

    static async getUserInvestments(user_id: string): Promise<InvestmentRecord[] | null> {
        try {
            const db: Database = await dbPromise;
            const investments: InvestmentRecord[] = await db.all<InvestmentRecord[]>(
                'SELECT * FROM investments WHERE user_id = ?', [user_id]);
            return investments.length === 0 ? null : investments.map(obj => new InvestmentRecord(obj));
        } catch (err) {
            console.error(`Error getting investments for user ${user_id}:`, err.message);
            return null;
        }
    }

    static async getOneById(id: string): Promise<InvestmentRecord | null> {
        try {
            const db: Database = await dbPromise;
            const user = await db.get<InvestmentRecord>('SELECT * FROM investments WHERE id = ?', [id]);
            return user ? new InvestmentRecord(user) : undefined;
        } catch (err) {
            console.error(`Error getting investment by id ${id}:`, err.message);
            return null;
        }
    }

    static async deleteInvestment(id: string): Promise<boolean> {
        const db: Database = await dbPromise;
        try {
            const result = await db.run('DELETE FROM investments WHERE id = ?', [id]);

            if (result.changes === 0) {
                console.warn(`No investment found with id ${id} to delete.`);
                return false;
            }

            return true;
        } catch (err) {
            console.error(`Error deleting investment with id ${id}:`, err.message);
            return false;
        }
    }

    async insertNewInvestment(): Promise<string | null> {
        try {
            if (!this.id) {
                this.id = uuid();
            }
            const db: Database = await dbPromise;
            await db.run(
                'INSERT INTO investments (id, user_id, name, quantity, price) VALUES (?, ?, ?, ?, ?)',
                [this.id, this.user_id, this.name, this.quantity, this.price]
            );

            return this.id;
        } catch (err) {
            console.error('Error inserting new investment:', err.message);
            return null;
        }
    }
}
