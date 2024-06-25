import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import {createTheme, ThemeProvider,  responsiveFontSizes} from '@mui/material/styles';
import {Route,Routes, useNavigate} from "react-router-dom";
import Forgetpassword from './components/login/forgetPassword';
import Register from './components/register/register';
import Login from './components/login/login';
import NavBar  from './components/header/nav';
import Clinicican from './components/clinician';
import './App.css';
import Client from './components/client';
import ActionItems from './components/client/actionItems';
import Profile from './components/header/profile';
import Items from './components/client/items'
import Protected from './utils/protected';
import Session from './components/session/session'
let theme = createTheme({
  typography: {
      fontFamily: 'sans-serif',
  },
});
theme = responsiveFontSizes(theme);
class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      openDialog:false,
      
    }
  }
  // componentDidMount() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(function(position) {
  //       console.log("Latitude is :", position.coords.latitude);
  //       console.log("Longitude is :", position.coords.longitude);
  //     });
  //   }
  // }
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
        
          <div>
            <NavBar nagivate={this.props.nagivate}/>
            <Routes>
              <Route element={<Protected/>}>
              
                <Route path="/register"  element={<Register nagivate={this.props.nagivate}/>}/>
                <Route path='/clinician' element={<Clinicican nagivate={this.props.nagivate}/>}/>
               <Route path='/client' element={<Client nagivate={this.props.nagivate}/>}/>
                {/* <Route path='/summary' element={<Summary nagivate={this.props.nagivate}/>}/> */}

                <Route path='/session' element={<Session nagivate={this.props.nagivate}/>}/>


                
                {/* <Route path='/session' element={<Assessment nagivate={this.props.nagivate}/>}/>
                <Route path='/review' element={<Review nagivate={this.props.nagivate}/>}/>
                <Route path='/select' element={<Select nagivate={this.props.nagivate}/>}/>
                <Route path='/discuss' element={<Discuss nagivate={this.props.nagivate}/>}/> */}


                <Route path='/actionitems' element={<ActionItems nagivate={this.props.nagivate}/>}/>
                
                <Route path='/forgetpassword' element={<Forgetpassword nagivate={this.props.nagivate}/>}/>
                <Route path='/profile' element={<Profile nagivate={this.props.nagivate}/>}/>
                <Route path='/items' element={<Items nagivate={this.props.nagivate}/>}/>
              </Route>
              <Route path='/' exact element={<Login nagivate={this.props.nagivate}/>}/>
            </Routes> 
          </div>
          
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
