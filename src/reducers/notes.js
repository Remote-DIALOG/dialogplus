import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
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
export const getSummary = createAsyncThunk("actionitem/getsummary", 
    async(args, {rejectWithValue}) => {
        try{
            const {data} = await API.post("/session/getsessiondata", args);
            return data;
        }catch(error) {
            this.rejectWithValue(error.response.data)
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
        notes:[],
        isLoading:false,
        currentDate:"",
        summary:[],
        sessionsummary:[]
    },
    reducers :{
        updateNotesExternal(state, action) {
            return {
                ...state,
                notes:action.payload
            }
        },
        addCurrentNotes(state, action) {
            return {
                ...state,
                notes:state.notes.concat(action.payload)
            }
        },
        setDate(state, action) {
            return {
                ...state,
                currentDate:action.payload
            }
        },
        clearsummary(state, action) {
            return {
                ...state,
                summary:[]
            }
        },
        clearnotes(state, action) {
            return {
                ...state,
                notes:[]
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
            state.notes = payload;
            state.isSuccess = true;
        },
        [getNotes.rejected]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = false;
        },

        [getSummary.pending]: (state, {payload}) => {
            state.isLoading = true;
        },
        [getSummary.fulfilled]: (state, {payload}) => {
            state.summary = payload;
            state.isLoading = false;
            state.isSuccess = true;
        },
        [getSummary.rejected]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = false;
        }

    },
})
export const {updateNotesExternal, setDate, addCurrentNotes, clearsummary, clearnotes} = NotesSlice.actions;
export default NotesSlice.reducer;