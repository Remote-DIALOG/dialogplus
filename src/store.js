import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger';
import loginReducer from './reducers/login';
import clinicianReducer from './reducers/clinician';
import SessionReducer from './reducers/session';
import ClientReducer from './reducers/client';
import ActionItemsReducer from './reducers/actionitems';
import thunkMiddleware from 'redux-thunk'
const store = configureStore({
    reducer : {
        loginReducer:loginReducer,
        clinicianReducer:clinicianReducer,
        SessionReducer:SessionReducer,
        ClientReducer:ClientReducer,
        ActionItemsReducer:ActionItemsReducer

    },
    middleware: [thunkMiddleware, logger],
});
export default store;
