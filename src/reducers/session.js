import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
export const getSessionData = createAsyncThunk(
    "session/getData",
    async (args, {rejectWithValue} ) => {   
        try {
            const {data} = await API.post('/users/login',args); 
            return data;
        }catch(error) {
            this.rejectWithValue(JSON.stringify(error));
        }
    }
)
export const saveCurrentSession = createAsyncThunk(
    "session/saveCurrentSession",
    async(args, {rejectWithValue})=> {
        try {
            const {data} = await API.post('/session/saveSession', args);
            console.log(data)
            return data
        }catch(error) {
            this.rejectWithValue(JSON.stringify(error))
        }
    }
)
export const SessionSlice = createSlice({
    name:"session",
    initialState: {
        isSuccess:false,
        current_session:[],
        past_session:[],
        message:"",
        isLoading:false
    },
    reducers :{
        setValue(state, action) {
            return {
                ...state,
                current_session:action.payload
             }            
           
        },
        checkValue(state, action) {
            console.log('check value is called')
        },
    },
    extraReducers: {
        // [getSessionData.pending]: (state, {payload}) =>  {
        //     state.isLoading = true;
        // },

        // [getSessionData.fulfilled]: (state, {payload}) => {
        //     state.isLoading = true;
        //     state.userinfo = payload;
        //     state.isSuccess = true;
        // },
        // [getSessionData.rejected]: (state, {payload}) => {
        //     state.message = payload;
        //     state.isLoading = false;
        //     state.isSuccess = false;
        // }
    },
})
export const {setValue,checkValue} = SessionSlice.actions;
export default SessionSlice.reducer;