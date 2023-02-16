import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
import { setUserIdAndTime } from "./session";
export const getNotes = createAsyncThunk(
    "actionitem/getNotes",
    async (args, {rejectWithValue} ) => { 
        try {
            const {data} = await API.post('/notes/getnotes',args); 
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
            const {data} = await API.post('/notes/addNotes',args); 
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
        pastnotes:[],
        isLoading:false,
        currentnotes:[],
        currentDate:""
    },
    reducers :{
        addPastNotes(state, action) {
            return {
                ...state,
                pastnotes:state.pastnotes.concat(action.payload)
            }
        },
        updateNotesExternal(state, action) {
            return {
                ...state,
                currentnotes:action.payload
            }
        },
        addCurrentNotes(state, action) {
            return {
                ...state,
                currentnotes:state.currentnotes.concat(action.payload)
            }
        },
        setDate(state, action) {
            return {
                ...state,
                currentDate:action.payload
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
            state.pastnotes = payload;
            state.isSuccess = true;
        },
        [getNotes.rejected]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = false;
        },

    },
})
export const {addPastNotes, updateNotesExternal, setDate, addCurrentNotes} = NotesSlice.actions;
export default NotesSlice.reducer;