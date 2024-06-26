import {Income} from '../models/income.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from '../utils/apiError.js'
import { isValidObjectId } from 'mongoose';
import { User} from '../models/user.model.js'
import {apiResponse} from '../utils/apiResponse.js'

const addTransaction = asyncHandler(async(req, res) => {

    const {content, amount} = req.body;

    if(!content || !amount){
        throw new apiError(400, "All fields are required");
    }

    const transaction = await Income.create({
        content,
        amount,
        createdBy: req.user.id
    })

    return res
    .status(200)
    .json(new apiResponse(200, transaction, "Transaction created successfully"))
})

const deleteTransaction = asyncHandler(async(req, res) => {

    const {transactionId} = req.params;

    if(!isValidObjectId(transactionId)){
        throw new apiError(400, "Invalid transaction")
    }

    const transaction = await Income.findByIdAndDelete(transactionId);

    return res
    .status(200)
    .json(new apiResponse(200, transaction,"Transaction deleted successfully"))
})

const getAllTransaction = asyncHandler(async(req, res) => {

    const userId = req.user;

    if(!isValidObjectId(userId)){
        throw new apiError(404, "Invalid user")
    }

    const user = await User.findById(userId);

    if(!user){
        throw new apiError(402, "User not found")
    }

    const transactions = await Income.aggregate([
        {
            $match: {createdBy: user._id}
        }
    ])

    return res
    .status(200)
    .json(new apiResponse(200, transactions, "All transactions fetch successfully"))
})

export {addTransaction, deleteTransaction, getAllTransaction}