import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './reducers/profileReducer';

const store = configureStore({
    reducer: {
        profileReducer,
    },
});

export default store;