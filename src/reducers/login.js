import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
export const getData = createAsyncThunk(
    "user/login",
    async (args, {rejectWithValue} ) => {   
        try {
            const {data} = await API.post('/users/login', args); 
            return data;
        }catch(error) {
            console.log("error = ", error.response.data.message)
            this.rejectWithValue(error.response.data.message);
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
            state.userinfo = payload;
            state.isSuccess = true;
            state.isLogin = true; 
          
        },
        [getData.rejected]: (state, {payload}) => {
            console.log("in rejected", payload)
            state.message = payload|| "Something went wrong";
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
})
export const {logout} = loginSlice.actions;
export default loginSlice.reducer;