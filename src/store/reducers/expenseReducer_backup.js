import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FetchAPIData from '../../helpers/FetchAPIData';

const initialState = {
    allExpensesData: null,
    allExpensesDataLoader: false,
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

const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers: {
        addExpense: (state, { payload }) => {
            state.allExpensesData = [payload, ...state.allExpensesData]
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
            console.log('Error Occur in Fetching Data');
        },
        [fetchAllExpensesData.fulfilled]: (state, { payload }) => {
            state.allExpensesDataLoader = false;
            state.allExpensesData = payload;
        },
        [deleteExpense.fulfilled]: (state, { payload }) => {
            state.allExpensesData = state.allExpensesData.filter(expense => expense._id !== payload);
        },
    }
});


export const { addExpense } = expensesSlice.actions;
export default expensesSlice.reducer;