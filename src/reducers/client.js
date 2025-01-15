import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
export const getSessionDates = createAsyncThunk(
    "client/getSessionDates",
    async (args, {rejectWithValue} ) => {   
        try {
            const {data} = await API.post('/client/getSessionDates',args); 
            return data;
        }catch(error) {
            this.rejectWithValue(error.response.data);
        }
    }
)
export const getClientInfo = createAsyncThunk(
    "clinet/getclientInfo",
    async (args, {rejectWithValue}) => {
        try {
            const {data} = await API.post('/client/getClinetinfo', args);
            return data
        }catch(error) {
            this.rejectWithValue(error)
        }
    }
)
export const ClientSlice = createSlice({
    name:"session",
    initialState: {
        isSuccess:false,
        dates:[],
        message:"",
        actionitems:[],
        isLoading:false,
        clientinfo:{}
    },
    reducers :{
        setClientinfo(state, action ) {
            state.clientinfo = action.payload
        },
        setActionItems(state, action) {
            state.session.concat(action.payload)
        }
    },
    extraReducers: {
        [getClientInfo.pending]:(state, {payload}) => {
            state.isLoading = true;
        },
        [getClientInfo.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.clientinfo = payload;
            state.isSuccess = true
        },
        [getClientInfo.rejected]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = false;
        },



        [getSessionDates.pending]: (state, {payload}) =>  {
            state.isLoading = true;
        },

        [getSessionDates.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.dates = payload;
            state.isSuccess = true;
        },
        [getSessionDates.rejected]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = false;
            state.dates = []
        },

    },
})
export const {setActionItems,setClientinfo} = ClientSlice.actions;
export default ClientSlice.reducer;