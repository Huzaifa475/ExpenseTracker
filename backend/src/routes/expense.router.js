import { Router } from "express";
import { addTransaction, deleteTransaction, getAllTransaction } from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addtransaction").post(verifyJWT, addTransaction)

router.route("/deletetransaction/:transactionId").delete(verifyJWT, deleteTransaction);

router.route("/get-transactions").get(verifyJWT, getAllTransaction);

export default router