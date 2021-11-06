import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import APIRequestHelper from '../../helpers/APIRequestHelper';
// import { profileData } from '../../mocks/profileData';

const initialState = {
    profileData: null,
    profileDataLoader: false,
    accessToken: null,
}

export const fetchProfileData = createAsyncThunk(
    'profileData/fetchProfileData',
    async () => {
        // const response = await APIRequestHelper('/');
        return [];
    }
)

const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchProfileData.pending]: (state) => {
            state.profileDataLoader = true;
        },
        [fetchProfileData.fulfilled]: (state, { payload }) => {
            state.profileDataLoader = false;
            state.profileData = payload;
        },
        [fetchProfileData.rejected]: (state) => {
            state.profileDataLoader = false;
            console.log('Error Occur in Fetching Data');
        },
    }
});


// export const {  } = profileSlice.actions;
export default profileSlice.reducer;