import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "./incomeSlice"
import expenseReducer from "./expenseSlice"

const store = configureStore({
    reducer: {
        income: incomeReducer,
        expense: expenseReducer,
    }
})

export default store;