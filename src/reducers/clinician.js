import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
export const addClinet = createAsyncThunk(
    "clinician/addClient", 
    async (args, {rejectWithValue}) => {
        try {
            const {data} = await API.post('/clinician/addClient', {headers:{'content-type':'application/json'},
            args
        });
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
            const {data} = await API.post('/clinician/getclinets', {headers: {
                'Content-Type': 'application/json',
            },
                args
            }); 
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
    reducers :{},
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
export default ClinicianSlice.reducer;