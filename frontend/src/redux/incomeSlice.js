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
            dispatch(setLoading());
            const fetchRes = await axios({
                method: 'get',
                url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/income/get-transactions',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, 
                }})
        dispatch(setIncomeTransactions(fetchRes.data?.data))
    } catch (error) {
        // dispatch(setError(error.message));
        // console.log(error);
    }
}

export const fetchIncomes = () => async(dispatch) => {
    dispatch(setLoading());
    const res = await axios({
        method: 'get',
        url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/income/get-transactions',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`, 
        }})
    dispatch(setIncomeTransactions(res.data?.data))
    // try {

    // } catch (error) {
    //     // dispatch(setError(error.message));
    //     // console.log(error);
    // }
}

export const deleteIncomeTransactionAndFetch = (transactionId) => async(dispatch) =>{
    try {
        const res = await axios({
            method: 'delete',
            url: `https://expense-tracker-blue-pi.vercel.app/api/v1/expense/deletetransaction/${transactionId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            }})
            dispatch(setLoading());
        const fetchRes = await axios({
            method: 'get',
            url: 'https://expense-tracker-blue-pi.vercel.app/api/v1/income/get-transactions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            }})
        dispatch(setIncomeTransactions(fetchRes.data?.data))
    } catch (error) {
        // dispatch(setError(error.message));
        // console.log(error);
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
            state.loading = true; // Set loading to true when starting an API request
        },
        setError: (state, action) => {
            state.loading = false; // Set loading to false on error
            state.error = action.payload;
        },
        resetIncomeState: () => initialState
    }
})

export const  {setIncomeTransactions, setError, setLoading, resetIncomeState} = incomeSlice.actions;
export default incomeSlice.reducer;