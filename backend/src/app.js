import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    // origin: ["https://expense-tracker-two-weld.vercel.app"],
    origin: "*",
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true
}));

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

app.use(cookieParser())

app.get('/', (req, res) => {
    console.log("1234");
    res.send('Hello World!');
});

import userRouter from './routes/user.router.js'
import incomeRouter from './routes/income.router.js'
import expenseRouter from './routes/expense.router.js'

app.use("/api/v1/users", userRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);

export default app