import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {ReactSession} from 'react-client-session';
import API from '../utils/api';
export const getData = createAsyncThunk(
    "user/login",
    async (args, {rejectWithValue} ) => {   
        try {
            
            ReactSession.set("credential", JSON.stringify(args));
            const {data} = await API.post('/users/login', args); 
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
        isLoading:false,
        isLogin:false
    },
    reducers :{
        logout(state, action) {
            console.log("login reducer = ", action.payload)
        }
    },
    extraReducers: {
        [getData.pending]: (state, {payload}) =>  {
            state.isLoading = true;
        },

        [getData.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            if (payload.hasOwnProperty("message")) {
                state.message = payload.message
                state.userinfo = {};
                state.isSuccess = false;
                state.isLogin = false;    
            }
            else {
                state.userinfo = payload;
                state.isSuccess = true;
                state.isLogin = true; 
            }
        },
        [getData.rejected]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
})
export const {logout} = loginSlice.actions;
export default loginSlice.reducer;