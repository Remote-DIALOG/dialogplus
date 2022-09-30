import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
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
export const SessionSlice = createSlice({
    name:"session",
    initialState: {
        isSuccess:false,
        session:[],
        message:"",
        isLoading:false
    },
    reducers :{
        setValue(state, action) {
            console.log(action.payload)
        }
    },
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
export const {setValue} = SessionSlice.actions;
export default SessionSlice.reducer;