import express, { json } from "express";
import 'express-async-errors'
import cors from 'cors';
import { handleError } from "./utils/errors";
import { investmentRouter } from "./routers/investment";
import { userRouter } from "./routers/user";

const app = express()

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173']
}));

app.use(json());

app.use('/investments', investmentRouter);
app.use('/user', userRouter);

app.use(handleError);
app.listen(3001, () => {
    console.log('Listening on port http://localhost:3001')
})