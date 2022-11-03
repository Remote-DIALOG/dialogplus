import React from 'react';
import {Route,Routes, useNavigate} from "react-router-dom"
import Register from './components/register/register';
import Login from './components/login/login';
import NavBar  from './components/header/nav';
import Clinicican from './components/clinician';
import './App.css';
import Client from './components/client';
import Session from './components/session/index';
import ActionItems from './components/client/actionItems';
import Review from './components/review/review'
import { Provider } from 'react-redux';
import { ReactSession } from 'react-client-session';
import store from './store';
import {createTheme, ThemeProvider} from '@mui/material/styles';
// import {getData} from './reducers/login';
// import {connect} from 'react-redux';
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
    ReactSession.setStoreType("localStorage");
  }
  render () {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div>
            <NavBar/>
            <Routes>
              <Route path='/' exact element={<Login nagivate={this.props.nagivate}/>}/>
              <Route path="/register"  element={<Register nagivate={this.props.nagivate}/>}/>
              <Route path='/clinician' element={<Clinicican nagivate={this.props.nagivate}/>}/>
              <Route path='/client' element={<Client nagivate={this.props.nagivate}/>}/>
              <Route path='/session' element={<Session nagivate={this.props.nagivate}/>}/>
              <Route path='/action' element={<ActionItems nagivate={this.props.nagivate}/>}/>
              <Route path='/review' element={<Review nagivate={this.props.nagivate}/>}/>
            </Routes> 
          </div>
        </ThemeProvider>
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
