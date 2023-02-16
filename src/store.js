import {configureStore,combineReducers} from '@reduxjs/toolkit';
import {logger} from 'redux-logger';
import loginReducer from './reducers/login';
import clinicianReducer from './reducers/clinician';
import SessionReducer from './reducers/session';
import ClientReducer from './reducers/client';
import NotesReducer from './reducers/notes';
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};
const appReducer = combineReducers({
    loginReducer:loginReducer,
    clinicianReducer:clinicianReducer,
    SessionReducer:SessionReducer,
    ClientReducer:ClientReducer,
    NotesReducer:NotesReducer
})
const reducerProxy = (state, action) => {
    if(action.type === 'logout/LOGOUT') {
      return appReducer(undefined, action);
    }
    return appReducer(state, action);
  }
  
const pReducer = persistReducer(persistConfig, reducerProxy);
export const store = configureStore({
    reducer : pReducer,
    middleware: [thunkMiddleware, logger],
});
export const persistor = persistStore(store)
// export default persistor;
// export default store;
