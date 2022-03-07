import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FetchAPIData from '../../helpers/FetchAPIData';

const initialState = {
    allKhatas: null,
    allKhataTransactions: null,
    allKhataTransactionsLoader: false,

    totalAmount: 0,
    allMoneyData: null,
    allMoneyDataLoader: false,
    totalAmount: null,
}

export const fetchAllKhataTransactions = createAsyncThunk(
    'fetchAllKhataTransactions',
    async () => {
        const response = await FetchAPIData('get', '/get-khata-transactions/62257c949976c31ea880d032');
        console.log('response: ', response);
        return response.data;
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
        addAllKhatas: (state, { payload }) => {
            state.allExpensesData = [payload, ...state.allExpensesData]
        },
        addKhataTransaction: (state, { payload }) => {
            state.allKhataTransactions = [payload, ...state.allKhataTransactions]
        },
    },
    extraReducers: {
        [fetchAllKhataTransactions.pending]: (state) => {
            state.allExpensesDataLoader = true;
        },
        [fetchAllKhataTransactions.fulfilled]: (state, { payload }) => {
            state.allKhataTransactionsLoader = false;
            console.log('payload.data: ', payload);
            state.allKhataTransactions = payload.data;
        },
        [fetchAllKhataTransactions.rejected]: (state) => {
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


export const { addKhataTransaction } = expensesSlice.actions;
export default expensesSlice.reducer;