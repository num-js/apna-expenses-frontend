import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FetchAPIData from '../../helpers/FetchAPIData';

const initialState = {
    allExpensesData: null,
    allExpensesDataLoader: false,
    totalAmount: 0,
    allMoneyData: null,
    allMoneyDataLoader: false,
}

export const fetchAllExpensesData = createAsyncThunk(
    'fetchAllExpensesData',
    async () => {
        const response = await FetchAPIData('get', '/get-expenses');
        console.log('response: ', response);
        return response.data.data;
    }
)

export const deleteExpense = createAsyncThunk(
    'deleteExpense',
    async (expenseId) => {
        try {
            const response = await FetchAPIData('delete', `/delete-expense/${expenseId}`);
            console.log('response: ', response);
            return expenseId;
        } catch (error) {
            console.log('Error: ', error);
        }
    }
)

export const deleteMoney = createAsyncThunk(
    'deleteExpense',
    async (transactionId) => {
        try {
            const response = await FetchAPIData('delete', `/delete-transaction/${transactionId}`);
            console.log('response: ', response);
            return transactionId;
        } catch (error) {
            console.log('Error: ', error);
        }
    }
)

export const fetchAllMoneyData = createAsyncThunk(
    'fetchAllMoneyData',
    async () => {
        const response = await FetchAPIData('get', '/get-transactions');
        console.log('response: ', response);
        return response.data.data;
    }
)

const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers: {
        addExpense: (state, { payload }) => {
            state.allExpensesData = [payload, ...state.allExpensesData]
        },
        addTransaction: (state, { payload }) => {
            state.allMoneyData = [payload, ...state.allMoneyData]
        },
    },
    extraReducers: {
        [fetchAllExpensesData.pending]: (state) => {
            state.allExpensesDataLoader = true;
        },
        [fetchAllExpensesData.fulfilled]: (state, { payload }) => {
            state.allExpensesDataLoader = false;
            state.allExpensesData = payload;
        },
        [fetchAllExpensesData.rejected]: (state) => {
            state.allExpensesDataLoader = false;
            console.log('Error Occur in Fetching Expense Data');
        },
        [deleteExpense.fulfilled]: (state, { payload }) => {
            state.allExpensesData = state.allExpensesData.filter(expense => expense._id !== payload);
        },
        [fetchAllMoneyData.pending]: (state) => {
            state.allMoneyDataLoader = true;
        },
        [fetchAllMoneyData.fulfilled]: (state, { payload }) => {
            state.allMoneyDataLoader = false;
            state.allMoneyData = payload;
        },
        [fetchAllMoneyData.rejected]: (state) => {
            state.allMoneyDataLoader = false;
            console.log('Error Occur in Fetching Account Data');
        },
        [deleteExpense.fulfilled]: (state, { payload }) => {
            state.allMoneyData = state.allMoneyData.filter(transaction => transaction._id !== payload);
        },
    }
});


export const { addExpense, addTransaction } = expensesSlice.actions;
export default expensesSlice.reducer;