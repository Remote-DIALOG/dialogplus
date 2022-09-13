import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger';
import loginReducer from './reducers/login';
import clinicianReducer from './reducers/clinician';
import thunkMiddleware from 'redux-thunk'
const store = configureStore({
    reducer : {
        loginReducer:loginReducer,
        clinicianReducer:clinicianReducer
    },
    middleware: [thunkMiddleware, logger],
});
export default store;
