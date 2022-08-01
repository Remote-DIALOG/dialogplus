import React from 'react';
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Register from './components/register/register';
import Login from './components/login/login';
import NavBar  from './components/header/nav';
import Clinicican from './components/clinician';
import './App.css';
import Client from './components/client';
import Session from './components/session/index';
import ActionItems from './components/client/actionItems';
import { Provider } from 'react-redux';
import store from './store';
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Provider store={store}>
      <div>
        <NavBar/>
        <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Login/>}/>
          
          <Route path="/register"  element={<Register/>}/>

          <Route path='/clinician' element={<Clinicican/>}/>
          <Route path='/client' element={<Client/>}/>
          <Route path='/session' element={<Session/>}/>
          <Route path='/action' element={<ActionItems/>}/>
        </Routes> 
         </BrowserRouter> 
      </div>
      </Provider>
    );

  }
}

export default App;
