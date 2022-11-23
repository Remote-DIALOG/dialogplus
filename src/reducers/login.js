import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
export const getData = createAsyncThunk(
    "user/login",
    async (args, {rejectWithValue} ) => {   
        try {
            const {data} = await API.post('/users/login', args); 
            return data;
        }catch(error) {
            // console.log(error)
            let message
            if (error.code=='ERR_NETWORK') {
                message = "Unable to connect to server please check your Network"
            } else {
                message = error.response.data.message;
            }
            return rejectWithValue(message);
        }
    }
)
export const logout = createAsyncThunk(
    "auth/logout",
    async function (_payload, thunkAPI) {
        thunkAPI.dispatch({ type: 'logout/LOGOUT' });
    }
);
export const loginSlice = createSlice({
    name:"login",
    initialState: { 
        isSuccess:false,
        userinfo:{},
        message:"",
        isLoading:false,
        isLogin:false
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
            state.message=""
          
        },
        [getData.rejected]: (state, action) => {
            console.log("in rejected", action)
            state.message = action.payload|| "Something went wrong";
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
})
export default loginSlice.reducer;