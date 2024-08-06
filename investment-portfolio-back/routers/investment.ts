import { Router, Response, Request } from "express";
import { InvestmentRecord } from "../records/investment.record";
import { UserRecord } from "../records/user.record";

export const investmentRouter = Router();

investmentRouter

    .get('/', async (req: Request, res: Response) => {
        try {
            const investments = await InvestmentRecord.listAll();
            res.json(investments);
        } catch (err) {
            console.error('Error retrieving investments:', err.message);
            res.status(500).json({ error: 'Failed to retrieve investments' });
        }
    })

    .get('/:user_id', async (req: Request, res: Response) => {
        const { user_id } = req.params;
        try {
            const investments = await InvestmentRecord.getUserInvestments(user_id);
            res.json(investments);
        } catch (err) {
            console.error('Error retrieving investments:', err.message);
            res.status(500).json({ message: 'Failed to retrieve investments' });
        }
    })

    .post('/add', async (req: Request, res: Response) => {
        const { user_id, name, quantity, price } = req.body;
        try {
            const user = await UserRecord.getOneById(user_id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const totalCost = quantity * price;
            // if (user.balance < totalCost) {
            //     return res.status(400).json({ error: 'Insufficient balance' });
            // }

            const newBalance = user.balance - totalCost;
            await user.updateBalance(newBalance);

            const newInvestment = new InvestmentRecord(req.body);
            await newInvestment.insertNewInvestment();

            res.status(201).json({ message: `Investment ${newInvestment.name} added successfully`, newBalance });
        } catch (err) {
            console.error('Error adding investment:', err.message);
            res.status(500).json({ message: 'Failed to add investment' });
        }
    })

    .put('/update-balance', async (req: Request, res: Response) => {
        const { user_id, amount } = req.body;

        // if (amount <= 0) {
        //     return res.status(400).json({ error: 'Amount to add must be positive' });
        // }

        try {
            const user = await UserRecord.getOneById(user_id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const newBalance = user.balance + Number(amount);
            await user.updateBalance(newBalance);

            res.status(201).json({ message: 'Balance updated successfully', newBalance });
        } catch (err) {
            console.error('Error updating balance:', err.message);
            res.status(500).json({ message: 'Failed to update balance' });
        }
    })

    .delete('/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const investment = await InvestmentRecord.getOneById(id);

            if (!investment) {
                return res.status(404).json({ message: 'Investment not found' });
            }

            const user = await UserRecord.getOneById(investment.user_id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const refundAmount = investment.quantity * investment.price;

            const deleteSuccessful = await InvestmentRecord.deleteInvestment(id);
            if (deleteSuccessful) {
                const newBalance = user.balance + refundAmount;
                await user.updateBalance(newBalance);

                res.json({ message: 'Investment deleted successfully', newBalance });
            } else {
                console.error('Error deleting investment:', `Investment with id ${id} could not be deleted`);
                res.status(500).json({ message: 'Failed to delete investment' });
            }
        } catch (err) {
            console.error('Error deleting investment:', err.message);
            res.status(500).json({ message: 'Failed to delete investment' });
        }
    });