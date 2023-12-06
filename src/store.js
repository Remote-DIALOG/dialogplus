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

  const sendLogsToServer = (logs) => {
    // console.log("----->", JSON.stringify(logs))
    // axios.post('https://example.com/logs', logs)
    // .then(response => {
    //   // Log success message or handle response data as needed
    // })
    // .catch(error => {
    //   // Handle error
    // });
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
