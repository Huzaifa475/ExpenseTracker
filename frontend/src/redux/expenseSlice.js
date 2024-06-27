import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.withCredentials = true;
export const addExpenseTransactionAndFetch = (title, amount) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const addRes = await axios({
            method: 'post',
            url: '/api/v1/expense/addtransaction',
            data: {
                content: title,
                amount
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        dispatch(setLoading());
        const fetchRes = await axios({
            method: 'get',
            url: '/api/v1/expense/get-transactions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        dispatch(setExpenseTransactions(fetchRes.data?.data));
    } catch (error) {
          console.error(error);
    }
};

export const fetchExpenses = () => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        dispatch(setLoading());
        const res = await axios({
            method: 'get',
            url: '/api/v1/expense/get-transactions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        dispatch(setExpenseTransactions(res.data?.data));
    } catch (error) {
        console.log(error);
    }
};

export const deleteExpenseTransactionAndFetch = (transactionId) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const addRes = await axios({
            method: 'delete',
            url: `/api/v1/expense/deletetransaction/${transactionId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        dispatch(setLoading());
        const fetchRes = await axios({
            method: 'get',
            url: '/api/v1/expense/get-transactions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        dispatch(setExpenseTransactions(fetchRes.data?.data));
    } catch (error) {
        console.log(error);
    }
}

const initialState = {
    expenseTransaction: [],
    loading: false,
    error: null,
    totalAmt: 0
}

const expenseSlice = createSlice({
    name: "expense",
    initialState,
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
        },
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetExpenseState: () => initialState
    }
})

export const { setExpenseTransactions, setError, setLoading, resetExpenseState } = expenseSlice.actions;
export default expenseSlice.reducer;