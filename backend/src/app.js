import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: ["https://expense-tracker-pop.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true
}));

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

import userRouter from './routes/user.router.js'
import incomeRouter from './routes/income.router.js'
import expenseRouter from './routes/expense.router.js'

app.use("/api/v1/users", userRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);

export default app
