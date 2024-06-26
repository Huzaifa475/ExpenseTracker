import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const addIncomeTransactionAndFetch = (title, amount) => async(dispatch) => {
    try {
        const res = await axios.post('/income/addtransaction', {
            content: title,
            amount
        })
        const fetchRes = await axios.get('/income/get-transactions')
        dispatch(setIncomeTransactions(fetchRes.data?.data))
    } catch (error) {
        console.log(error);
    }
}

export const fetchIncomes = () => async(dispatch) => {
    try {
        const res = await axios.get('/income/get-transactions')
        dispatch(setIncomeTransactions(res.data?.data))
    } catch (error) {
        console.log(error);
    }
}

export const deleteIncomeTransactionAndFetch = (transactionId) => async(dispatch) =>{
    try {
        const res = await axios.delete(`/income/deletetransaction/${transactionId}`)
        const fetchRes = await axios.get('/income/get-transactions')
        dispatch(setIncomeTransactions(fetchRes.data?.data))
    } catch (error) {
        console.log(error);
    }
}

const incomeSlice = createSlice({
    name: "income",
    initialState: {
        incomeTransaction: [],
        loading: true,
        error: null,
        totalAmt: 0
    },
    reducers: {
        setIncomeTransactions: (state, action) => {
            state.incomeTransaction = action.payload
            state.loading = false
            state.error = null
            const total = action.payload.map(item => item.amount);
            let t = 0;
            for (let index = 0; index < total.length; index++) {
                t += total[index];
            }
            state.totalAmt = t;
        }
    }
})

export const  {setIncomeTransactions} = incomeSlice.actions;
export default incomeSlice.reducer;