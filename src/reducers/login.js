// import TutorialDataService from '../utils/UserDataService'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
// import {postCall} from '../utils/api';
export const getData = createAsyncThunk(
    "user/login",
    async (args, {rejectWithValue} ) => {   
        try {
            const {data} = await API.post('/users/login', {headers: {
                'Content-Type': 'application/json',
            },
                args
            }); 
            return data;
        }catch(error) {
            this.rejectWithValue(error.response.data);
        }
    }
)
export const loginSlice = createSlice({
    name:"login",
    initialState: {
        isSuccess:false,
        userinfo:{},
        message:"",
        isLoading:false
    },
    reducers :{},
    extraReducers: {
        [getData.pending]: (state, {payload}) =>  {
            state.isLoading = true;
        },

        [getData.fulfilled]: (state, {payload}) => {
            state.isLoading = true;
            state.userinfo = payload;
            state.isSuccess = true;
        },
        [getData.rejected]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
})
export default loginSlice.reducer;