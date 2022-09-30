import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger';
import loginReducer from './reducers/login';
import clinicianReducer from './reducers/clinician';
import SessionReducer from './reducers/session';
import thunkMiddleware from 'redux-thunk'
const store = configureStore({
    reducer : {
        loginReducer:loginReducer,
        clinicianReducer:clinicianReducer,
        SessionReducer:SessionReducer

    },
    middleware: [thunkMiddleware, logger],
});
export default store;
