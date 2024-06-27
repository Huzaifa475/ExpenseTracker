import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// axios.defaults.withCredentials = true;
export const addIncomeTransactionAndFetch = (title, amount) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const addRes = await axios({
            method: 'post',
            url: '/api/v1/income/addtransaction',
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
            url: '/api/v1/income/get-transactions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        dispatch(setIncomeTransactions(fetchRes.data?.data))
    } catch (error) {
        console.log(error);
    }
}

export const fetchIncomes = () => async (dispatch) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        dispatch(setLoading());
        const res = await axios({
            method: 'get',
            url: '/api/v1/income/get-transactions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        dispatch(setIncomeTransactions(res.data?.data))
    } catch (error) {
        console.log(error);
    }
}

export const deleteIncomeTransactionAndFetch = (transactionId) => async (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const res = await axios({
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
            url: '/api/v1/income/get-transactions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        dispatch(setIncomeTransactions(fetchRes.data?.data))
    } catch (error) {
        console.log(error);
    }
}

const initialState = {
    incomeTransaction: [],
    loading: false,
    error: null,
    totalAmt: 0
}

const incomeSlice = createSlice({
    name: "income",
    initialState,
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
        },
        setLoading: (state) => {
            state.loading = true; 
        },
        setError: (state, action) => {
            state.loading = false; 
            state.error = action.payload;
        },
        resetIncomeState: () => initialState
    }
})

export const { setIncomeTransactions, setError, setLoading, resetIncomeState } = incomeSlice.actions;
export default incomeSlice.reducer;