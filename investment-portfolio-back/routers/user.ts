import { Router, Response, Request } from "express";
import { UserRecord } from "../records/user.record";

export const userRouter = Router();

userRouter

    .get('/', async (req: Request, res: Response) => {
        try {
            const users = await UserRecord.listAll();
            res.json(users);
        } catch (err) {
            console.error('Error retrieving users:', err.message);
            res.status(500).json({ error: 'Failed to retrieve users' });
        }
    })

    .get('/:id', async (req: Request, res: Response) => {
        try {
            const user = await UserRecord.getOneById(req.params.id);
            res.json(user);
        } catch (err) {
            console.error('Error retrieving user:', err.message);
            res.status(500).json({ message: 'Failed to retrieve user' });
        }
    })

    .post('/register', async (req: Request, res: Response) => {
        try {
            const users = await UserRecord.listAll();
            const newUser = new UserRecord(req.body);

            if (users.map((el) => el.username).includes(newUser.username)) {
                return res.status(400).json({
                    error: `There is already a user account registered with ${newUser.username}. Please try again with a different username.`
                });
            } else {
                await newUser.insertOne();
                res.status(201).json({ message: `${newUser.username} added successfully` });
            }
        } catch (err) {
            console.error('Error adding user:', err.message);
            res.status(500).json({ message: 'Failed to add user' });
        }
    })

    .post('/login', async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try {
            const user = await UserRecord.getOneByUsername(username);

            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const passwordMatch = await user.comparePassword(password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    username: user.username,
                    balance: user.balance
                }
            });
        } catch (err) {
            console.error('Error logging in:', err.message);
            res.status(500).json({ message: 'Failed to login' });
        }
    });
