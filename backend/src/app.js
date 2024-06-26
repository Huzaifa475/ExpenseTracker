import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: process.env.CROS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

app.use(cookieParser())

import userRouter from './routes/user.router.js'
import incomeRouter from './routes/income.router.js'
import expenseRouter from './routes/expense.router.js'

app.use("/api/v1/users", userRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);

export default app