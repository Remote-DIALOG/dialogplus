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
import {get_date} from './utils/get_date'
import API from './utils/api'
import {parser} from './utils/parser'
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

  const sendLogsToServer = async(logs) => {
    let logMessage = parser(logs)
    if (logMessage == null) {
      return
    }
    const data = await API.post('/session/saveLogs', {"message":logMessage})
  };
  const loggerMiddleware = store => next => action => {
    logger({ getState: store.getState })(next)(action);
    const state = store.getState();
    const logData = {
      action,
      state,
      timestamp: get_date()
    };
    sendLogsToServer(logData);
  };
const pReducer = persistReducer(persistConfig, reducerProxy);
export const store = configureStore({
  reducer : pReducer,
  middleware: [thunkMiddleware, loggerMiddleware],
});
export const persistor = persistStore(store)
// export default persistor;
// export default store;
