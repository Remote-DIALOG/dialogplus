// import TutorialDataService from '../utils/UserDataService'
import { createSlice } from "@reduxjs/toolkit";
import API from '../utils/api';
import {postCall} from '../utils/api';
export const loginSlice = createSlice({
    name:"login",
    initialState: {
        value:0,
        username: "",
        password:"",

    },
    reducers :{
        increment: (state) => {
            console.log("increament is called")
            state.value +=1;
        },
        decrement: (state) => {
            state.value -=1
        },
        invcrementByAmount:(state, action) => {
            console.log(action)
            state.value+=action.payload;
        }
    }
})
export const validatUser = (userinfo) => async (dispatch) => {
    try {
        if (!userinfo) {
            throw new Error("no data found")
        }
        console.log(userinfo);
        const response = await postCall('/users/login', userinfo);
        console.log(response);
    } catch(error) {
        throw new Error(error)
    }
}
export const {increment, decrement, invcrementByAmount} = loginSlice.actions
export default loginSlice.reducer;