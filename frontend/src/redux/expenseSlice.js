import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true;
export const addExpenseTransactionAndFetch = (title, amount) => async (dispatch) => {
    try {
      const addRes = await axios.post('https://expense-tracker-two-weld.vercel.app/expense/addtransaction', {
        content: title,
        amount
      });
      const fetchRes = await axios.get('https://expense-tracker-two-weld.vercel.app/expense/get-transactions');
      dispatch(setExpenseTransactions(fetchRes.data?.data));
    } catch (error) {
      console.error(error);
    }
};

export const fetchExpenses = () => async (dispatch) => {
    try {
      const res = await axios.get('https://expense-tracker-two-weld.vercel.app/expense/get-transactions');
        dispatch(setExpenseTransactions(res.data?.data));
    } catch (error) {
        console.log(error);
    }
};

export const deleteExpenseTransactionAndFetch = (transactionId) => async(dispatch) =>{
    try {
        const res = await axios.delete(`https://expense-tracker-two-weld.vercel.app/expense/deletetransaction/${transactionId}`)
        const fetchRes = await axios.get('https://expense-tracker-two-weld.vercel.app/expense/get-transactions');
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