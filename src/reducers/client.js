import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
export const getSessionDates = createAsyncThunk(
    "client/getSessionDates",
    async (args, {rejectWithValue} ) => {   
        try {
            const {data} = await API.post('/users/getSessionDates', {headers: {
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
        },

    },
})
export const {setActionItems,setClientinfo} = ClientSlice.actions;
export default ClientSlice.reducer;