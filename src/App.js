import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Route,Routes, useNavigate} from "react-router-dom";
import Forgetpassword from './components/login/forgetPassword';
import Register from './components/register/register';
import Login from './components/login/login';
import NavBar  from './components/header/nav';
import Clinicican from './components/clinician';
import './App.css';
import Client from './components/client';
import Session from './components/session/index';
import ActionItems from './components/client/actionItems';
import Select from './components/session/select';
import Review from './components/session/review';
import Discuss from './components/session/discuss';
import Profile from './components/header/profile';
import { TrackerProvider, Tracker } from 'react-tracker'
import trackAddToCart from './utils/track'
import { SocketContext,socket } from './utils/socket';
const theme = createTheme({
  typography: {
    fontFamily: [
      'sans-serif',
    ].join(','),
  },
});
class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      openDialog:false,
      
    }
    
  }
  render () {
    const tracker = new Tracker()
    // Listen on all event
    tracker.on('*', (event, eventsHistory) =>
        console.log("event track ---->", event)
    );
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
        <TrackerProvider tracker={tracker}>
          <div>
            <NavBar nagivate={this.props.nagivate}/>
            <Routes>
              <Route path='/' exact element={<Login nagivate={this.props.nagivate}/>}/>
              <Route path="/register"  element={<Register nagivate={this.props.nagivate}/>}/>
              <Route path='/clinician' element={<Clinicican nagivate={this.props.nagivate}/>}/>
              <Route path='/client' element={<Client nagivate={this.props.nagivate}/>}/>
              <Route path='/session' element={<Session nagivate={this.props.nagivate}/>}/>
              <Route path='/action' element={<ActionItems nagivate={this.props.nagivate}/>}/>
              <Route path='/review' element={<Review nagivate={this.props.nagivate}/>}/>
              <Route path='/select' element={<Select nagivate={this.props.nagivate}/>}/>
              <Route path='/discuss' element={<Discuss nagivate={this.props.nagivate}/>}/>
              <Route path='/forgetpassword' element={<Forgetpassword nagivate={this.props.nagivate}/>}/>
              <Route path='/profile' element={<Profile nagivate={this.props.nagivate}/>}/>
            </Routes> 
          </div>
          </TrackerProvider>
        </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}
// const mapStateToProps = (state) => ({
//   clinetList:state.clinicianReducer.clinetlist,
//   userinfo:state.loginReducer.userinfo
// })
// const mapDispatchToProps = {
//   getData

// }
export function APPWithRouter(props) {
  const nagivate  = useNavigate()
  return (<App nagivate={nagivate}></App>)
}
// export default App;
