import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';

const app = express();

app.use(cors({
    origin: ["https://expense-tracker-kwm6-frontend.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true
}));

mongoose.connect('mongodb+srv://huzaifa:POP4759H@learnmongo.bcryjbr.mongodb.net/test?retryWrites=true&w=majority&appName=LearnMongo')

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

import userRouter from './routes/user.router.js'
import incomeRouter from './routes/income.router.js'
import expenseRouter from './routes/expense.router.js'

app.use("/api/v1/users", userRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);

export default app