import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './reducers/profileReducer';
import expensesReducer from './reducers/expensesReducer';

const store = configureStore({
    reducer: {
        profileReducer,
        expensesReducer
    },
});

export default store;