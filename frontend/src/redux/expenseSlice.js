import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true;
const token = localStorage.getItem('accessToken');
export const addExpenseTransactionAndFetch = (title, amount) => async (dispatch) => {
    try {
    //   const addRes = await axios.post('https://expense-tracker-blue-pi.vercel.app/api/v1/expense/addtransaction', {
    //     content: title,
    //     amount
    //   },         
    //    headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`, 
    //   });
      const addRes = await axios({
        method: 'post',
        url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/expense/addtransaction',
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
            url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/expense/get-transactions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            }})
            //   const fetchRes = await axios.get('https://expense-tracker-blue-pi.vercel.app/api/v1/expense/get-transactions');
      dispatch(setExpenseTransactions(fetchRes.data?.data));
    } catch (error) {
      console.error(error);
    }
};

export const fetchExpenses = () => async (dispatch) => {
    try {
      const res = await axios({
        method: 'post',
        url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/expense/get-transactions',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, 
        }})
        dispatch(setExpenseTransactions(res.data?.data));
    } catch (error) {
        console.log(error);
    }
};

export const deleteExpenseTransactionAndFetch = (transactionId) => async(dispatch) =>{
    try {
        // const res = await axios.delete(`https://expense-tracker-blue-pi.vercel.app/api/v1/expense/deletetransaction/${transactionId}`)
        const addRes = await axios({
            method: 'post',
            url: `https://expense-tracker-blue-pi.vercel.app/api/v1/expense/deletetransaction/${transactionId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            }})
        const fetchRes = await axios({
            method: 'post',
            url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/expense/get-transactions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            }})
        dispatch(setExpenseTransactions(fetchRes.data?.data));
    } catch (error) {
        console.log(error);
    }
}

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        expenseTransaction: [],
        loading: true,
        error: null,
        totalAmt: 0
    },
    reducers: {
        setExpenseTransactions: (state, action) => {
            state.expenseTransaction = action.payload;
            state.loading = false;
            state.error = null;
            const total = action.payload.map(item => item.amount);
            let t = 0;
            for (let index = 0; index < total.length; index++) {
                t += total[index];
            }
            state.totalAmt = t;
        }
    }
})

export const {setExpenseTransactions} = expenseSlice.actions;
export default expenseSlice.reducer;