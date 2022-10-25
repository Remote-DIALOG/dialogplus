import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
export const addClinet = createAsyncThunk(
    "clinician/addClient", 
    async (args, {rejectWithValue}) => {
        try {
            const {data} = await API.post('/clinician/addClient', args);
            return data;
        }catch(error) {
            this.rejectWithValue(error.reposnse.message);
        }
    }
);
export const getClients = createAsyncThunk(
    "clinician/getClients",
    async (args, {rejectWithValue} ) => {   
        try {
            const {data} = await API.post('/clinician/getclinets', args); 
            return data;
        }catch(error) {
            this.rejectWithValue(error.response.message);
        }
    }
)
export const ClinicianSlice = createSlice({
    name:"clinician",
    initialState: {
        isSuccess:false,
        clinetlist:[],
        message:"",
        isLoading:false
    },
    reducers :{
        setClinet(state, action) {
            return {
                ...state,
                clinetlist:state.clinetlist.concat(action.payload)
            }
        }
    },
    extraReducers: {
        [getClients.pending]: (state, {payload}) =>  {
            state.isLoading = true;
        },

        [getClients.fulfilled]: (state, {payload}) => {
            state.isLoading = true;
            state.clinetlist = payload;
            state.isSuccess = true;
        },
        [getClients.rejected]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
})
export const {setClinet} = ClinicianSlice.actions;
export default ClinicianSlice.reducer;