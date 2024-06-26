import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.withCredentials = true;
const accessToken = localStorage.getItem('accessToken');
export const addIncomeTransactionAndFetch = (title, amount) => async(dispatch) => {
    try {
        // const res = await axios.post('https://expense-tracker-blue-pi.vercel.app/api/v1/income/addtransaction', {
        //     content: title,
        //     amount
        // })
        // const fetchRes = await axios.get('https://expense-tracker-blue-pi.vercel.app/api/v1/income/get-transactions')
        const addRes = await axios({
            method: 'post',
            url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/income/addtransaction',
            data: {
                content: title,
                amount
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            }})
            const fetchRes = await axios({
                method: 'post',
                url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/income/get-transactions',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                }})
        dispatch(setIncomeTransactions(fetchRes.data?.data))
    } catch (error) {
        console.log(error);
    }
}

export const fetchIncomes = () => async(dispatch) => {
    try {
        const res = await axios({
            method: 'post',
            url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/income/get-transactions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            }})
        dispatch(setIncomeTransactions(res.data?.data))
    } catch (error) {
        console.log(error);
    }
}

export const deleteIncomeTransactionAndFetch = (transactionId) => async(dispatch) =>{
    try {
        const res = await axios({
            method: 'post',
            url: `https://expense-tracker-blue-pi.vercel.app/api/v1/expense/deletetransaction/${transactionId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            }})
        const fetchRes = await axios({
            method: 'post',
            url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/income/get-transactions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            }})
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