import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FetchAPIData from '../../helpers/FetchAPIData';

const initialState = {
    allKhatas: null,
    allKhatasLoader: false,
    selectedKhataId: null,

    allKhataTransactions: null,
    allKhataTransactionsLoader: false,

    totalAmount: 0,
}

export const fetchAllKhataTransactions = createAsyncThunk(
    'fetchAllKhataTransactions',
    async (selectedKhataId) => {
        const response = await FetchAPIData('get', `/get-khata-transactions/${selectedKhataId}`);
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

export const fetchAllKhatas = createAsyncThunk(
    'fetchAllKhatas',
    async () => {
        const response = await FetchAPIData('get', '/get-all-khatas');
        console.log('response: ', response);
        return response.data.data;
    }
)

const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers: {
        addKhata: (state, { payload }) => {
            state.allExpensesData = [payload, ...state.allKhatas]
        },
        addKhataTransaction: (state, { payload }) => {
            state.allKhataTransactions = [...state.allKhataTransactions, payload]
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
        [fetchAllKhatas.pending]: (state) => {
            state.allKhatasLoader = true;
        },
        [fetchAllKhatas.fulfilled]: (state, { payload }) => {
            state.allKhatasLoader = false;
            state.allKhatas = payload;
            state.selectedKhataId = payload[0]._id
        },
        [fetchAllKhatas.rejected]: (state) => {
            state.allKhatasLoader = false;
            console.log('Error Occur in Fetching Account Data');
        },
        // [deleteExpense.fulfilled]: (state, { payload }) => {
        //     state.allMoneyData = state.allMoneyData.filter(transaction => transaction._id !== payload);
        // },
    }
});


export const { addKhataTransaction } = expensesSlice.actions;
export default expensesSlice.reducer;