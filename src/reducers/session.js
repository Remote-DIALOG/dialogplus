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
        try {
            console.log("past session")
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
        scale: ["Mental health", "Physical health", "Job situation", "Accommodation", "Leisure activities", "Relationship with partner/family", "Friendship", "Personal safety", "Medication", "Practical help", "Meetings"],
        marks: [
            { name:"totally dissatisifies",
              value: 1,
              label: 'totally dissatisfied',
            },
            {
              name: "very dissatisifies",
              value: 2,
              label:"very dissatisifies",
            },
            {
              name:"fairly dissatisifies",
              value: 3,
              label: "fairly dissatisifies",
            },
            { name:"in the middle",
            value: 4,
            label: "in the middle",
            },  
            { name:"fairly satisfied",
            value: 5,
            label: "fairly satisfied",
            },  
            { name:"very satifised",
            value: 6,
            label: "very satifised",
            },  
            { name:"totally satisfied",
            value: 7,
            label: "totally satisfied",
            }
          ],
          current_session: [
            {"created_at":""},
            {"created_by":0},
            {"name": "Mental health","value" :0},
            {"name":"Physical health","value": 0},
            {"name":"Job situation","value": 0},
            {"name":"Accommodation" ,"value": 0},
            {"name":"Leisure activities" ,"value":0},
            {"name":"Relationship with partner/family","value":0},
            {"name":"Friendship","value":0},
            {"name":"Personal safety","value": 0},
            {"name":"Medication","value":0},
            {"name":"Practical help","value":0},
            {"name":"Meetings","value":0}
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
        checkValue(state, action) {
            console.log('check value is called')
        },
        setUserIdAndTime(state, action) {
            let userId = action.payload.userId
            let timestamp = action.payload.today;
            let copyofCurrentSession = JSON.parse(JSON.stringify(state.current_session))
            copyofCurrentSession[0].created_at = timestamp
            copyofCurrentSession[1].created_by = userId
            return {...state, current_session: copyofCurrentSession}
        },
        updateSelectScale(state, action) {
            console.log("------>", action.payload)
            return {
                ...state,
                select_scale:state.select_scale.concat(action.payload)


            }
        },
        deleteSelectScale(state, action) {
            let copySelectScale = state.select_scale
            copySelectScale = copySelectScale.filter(function(item) {
                return item.name!=action.payload.name
            })
            return {
                ...state,
                select_scale: copySelectScale
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
export const {setCurrentSessionValue,checkValue, setUserIdAndTime,updateSelectScale,deleteSelectScale} = SessionSlice.actions;
export default SessionSlice.reducer;