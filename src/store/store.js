import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './reducers/profileReducer';
import expensesReducer from './reducers/expensesReducer';
import khataReducer from './reducers/khataReducer';

const store = configureStore({
    reducer: {
        profileReducer,
        expensesReducer,
        khataReducer
    },
});

export default store;