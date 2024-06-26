import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Expense = mongoose.model("Expense", expenseSchema)