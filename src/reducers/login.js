import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {ReactSession} from 'react-client-session';
import API from '../utils/api';
export const getData = createAsyncThunk(
    "user/login",
    async (args, {rejectWithValue} ) => {   
        try {
            console.log("in user/login");
            if( ReactSession.get("credential").length === 0)  {
                console.log("in if condition")
                ReactSession.set("credential", JSON.stringify(args));
            }
            const {data} = await API.post('/users/login', args); 
            console.log("data", data, typeof(data));
            return data;
        }catch(error) {
            console.log("error = ", error)
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
            console.log("in fullfilled", payload)
            state.isLoading = false;
            state.userinfo = payload;
            state.isSuccess = true;
            state.isLogin = true; 
        },
        [getData.rejected]: (state, {payload}) => {
            console.log("in rejected", payload)
            state.message = payload|| "Something went wrong";
            console.log(payload)
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
})
export const {logout} = loginSlice.actions;
export default loginSlice.reducer;