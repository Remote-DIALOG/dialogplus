import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
// export const getSessionData = createAsyncThunk(
//     "session/getData",
//     async (args, {rejectWithValue} ) => {   
//         try {
//             const {data} = await API.post('/users/login',args); 
//             return data;
//         }catch(error) {
//             this.rejectWithValue(JSON.stringify(error));
//         }
//     }
// )
export const getPastSession = createAsyncThunk(
    "session/getPastSession",
    async (args, {rejectWithValue} ) => {   
        console.log(args)
        try {
            const {data} = await API.post('/session/getPastSession',args); 
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
        past_session:[],
        message:"",
        isLoading:false,
        scale: ["Mental health", "Physical health", "Job situation", "Accommodation", "Leisure activities", "Relationship with partner/family", "Friendships", "Personal safety", "Medication", "Practical help", "Meetings"],
        marks: [
            { name:"totally dissatisifies",
              value: 1,
              label: 1,
            },
            {
              name: "very dissatisifies",
              value: 2,
              label:2,
            },
            {
              name:"fairly dissatisifies",
              value: 3,
              label:3,
            },
            { name:"in the middle",
            value: 4,
            label: 4,
            },  
            { name:"fairly satisfied",
            value: 5,
            label: 5,
            },  
            { name:"very satifised",
            value: 6,
            label: 6,
            },  
            { name:"totally satisfied",
            value: 7,
            label: 7,
            }
          ],
          current_session: [
            {"created_at":""},
            {"created_by":0},
            {"name": "Mental health","value" :0, "help":null, "select":false, open:false,actionitems:[]},
            {"name":"Physical health","value": 0, "help":null, "select":false, open:false,actionitems:[]},
            {"name":"Job situation","value": 0, "help":null, "select":false, open:false,actionitems:[]},
            {"name":"Accommodation" ,"value": 0, "help":null, "select":false, open:false,actionitems:[]},
            {"name":"Leisure activities" ,"value":0, "help":null, "select":false, open:false,actionitems:[]},
            {"name":"Relationship with partner/family","value":0, "help":null, "select":false, open:false,actionitems:[]},
            {"name":"Friendships","value":0, "help":null, "select":false, open:false,actionitems:[]},
            {"name":"Personal safety","value": 0, "help":null, "select":false, open:false,actionitems:[]},
            {"name":"Medication","value":0, "help":null, "select":false, open:false,actionitems:[]},
            {"name":"Practical help","value":0, "help":null, "select":false, open:false,actionitems:[]},
            {"name":"Meetings","value":0, "help":null, "select":false, open:false,actionitems:[]},
            {"clinicianID":null}
          ],
          select_scale:[]
    },
    reducers :{
        setCurrentSessionValue(state, action) {
            let stringifyCurrentSession = JSON.stringify(state.current_session)
            let copyofCurrentSession = JSON.parse(stringifyCurrentSession)
            let changesvalue = copyofCurrentSession.find(name=>name.name===action.payload.name)
            changesvalue.value = action.payload.value
            return {...state, current_session: copyofCurrentSession}
            
        },
        setopen(state, action) {
            let stringifyCurrentSession = JSON.stringify(state.current_session)
            let copyofCurrentSession = JSON.parse(stringifyCurrentSession)
            let changesvalue = copyofCurrentSession.find(name=>name.name===action.payload.name)
            changesvalue.open = action.payload.open
            return {...state, current_session: copyofCurrentSession}
        },
        setUserIdAndTime(state, action) {
            let userId = action.payload.userId
            let timestamp = action.payload.today;
            let copyofCurrentSession = JSON.parse(JSON.stringify(state.current_session))
            copyofCurrentSession[0].created_at = timestamp
            copyofCurrentSession[1].created_by = userId
            
            return {...state, current_session: copyofCurrentSession}
        },
        updateHelp(state, action) {
            let copyofSession = JSON.parse(JSON.stringify(state.current_session))
            let updatehelpvalue = copyofSession.find(name=>name.name===action.payload.name)
            updatehelpvalue.help = true
            return {
                ...state,
                current_session:copyofSession
            }
        },
        deleteHelp(state, action) {
            let copyofSession = JSON.parse(JSON.stringify(state.current_session))
            let updatehelpvalue = copyofSession.find(name=>name.name===action.payload.name)
            updatehelpvalue.help = false
            return {
                ...state,
                current_session:copyofSession
            }
        },
        selectDomain(state, action) {
            let copyofSession = JSON.parse(JSON.stringify(state.current_session))
            let updateselectvalue = copyofSession.find(name=>name.name===action.payload.name)
            updateselectvalue.select = !updateselectvalue.select
            return {
                ...state,
                current_session:copyofSession
            }
        },
        addActionItems(state, action) {
            let copyofSession = JSON.parse(JSON.stringify(state.current_session))
            let domain = copyofSession.find(name=>name.name===action.payload.name)
            domain.actionitems.push(action.payload.actionitems)
            return {
                ...state,
                current_session:copyofSession
            }
            
        },
        updateSessionExternal(state, action) {
            return {
                ...state,
                current_session:action.payload
            }
        }
    },
    extraReducers: {
        [getPastSession.pending]: (state, {payload}) =>  {
            state.isLoading = true;
        },

        [getPastSession.fulfilled]: (state, {payload}) => {
            state.isLoading = true;
            state.past_session = payload;
            state.isSuccess = true;
        },
        [getPastSession.rejected]: (state, {payload}) => {
            state.message = payload;
            state.isLoading = false;
            state.isSuccess = false;
        }
    },
})
export const {setCurrentSessionValue,checkValue, setUserIdAndTime,updateHelp,deleteHelp, setopen, updateSessionExternal, selectDomain, addActionItems} = SessionSlice.actions;
export default SessionSlice.reducer;