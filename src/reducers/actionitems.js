import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
export const getNotes = createAsyncThunk(
    "actionitem/getNotes",
    async (args, {rejectWithValue} ) => { 
        try {
            const {data} = await API.get('/actionitem/getnotes',args); 
            return data;
        }catch(error) {
            this.rejectWithValue(error.response.data);
        }
    }
)
export const addNotes = createAsyncThunk(
    "actionitem/addNotes",
    async (args, {rejectWithValue} ) => {   
        try {
            const {data} = await API.post('/actionitem/addNotes', {headers: {
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
export const NotesSlice = createSlice({
    name:"actionitems",
    initialState: {
        isSuccess:false,
        notes:[],
        isLoading:false
    },
    reducers :{
        addNewNotes(state, action) {
            return {
                ...state,
                notes:state.notes.concat(action.payload)
            }
        }
    },
    extraReducers: {
        [addNotes.pending]: (state, {payload}) =>  {
            state.isLoading = true;
        },

        [addNotes.fulfilled]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = true;
        },
        [addNotes.rejected]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = false;
        },


        [getNotes.pending]: (state, {payload}) => {
            state.isLoading = true;
        },
        [getNotes.fulfilled]: (state, {payload}) => {
            state.isLoading = false;
            state.actionitems = payload;
            state.isSuccess = true;
        },
        [getNotes.rejected]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = false;
        },

    },
})
export const {addNewNotes} = NotesSlice.actions;
export default NotesSlice.reducer;