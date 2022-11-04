import {configureStore,combineReducers} from '@reduxjs/toolkit';
import {logger} from 'redux-logger';
import loginReducer from './reducers/login';
import clinicianReducer from './reducers/clinician';
import SessionReducer from './reducers/session';
import ClientReducer from './reducers/client';
import ActionItemsReducer from './reducers/actionitems';
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};
const rootReducer = combineReducers({
    loginReducer:loginReducer,
    clinicianReducer:clinicianReducer,
    SessionReducer:SessionReducer,
    ClientReducer:ClientReducer,
    ActionItemsReducer:ActionItemsReducer
})
const pReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer : pReducer,
    middleware: [thunkMiddleware, logger],
});
export const persistor = persistStore(store)
// export default persistor;
// export default store;
