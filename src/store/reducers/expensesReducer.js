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

const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers: {

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
    }
});


// export const {  } = expensesSlice.actions;
export default expensesSlice.reducer;