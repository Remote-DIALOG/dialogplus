import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger';
import loginReducer from './reducers/login';

const store = configureStore({
    reducer : {
        loginReducer:loginReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
export default store;
