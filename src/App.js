import React from 'react';
import {BrowserRouter, Route,Routes, useNavigate} from "react-router-dom"
import Register from './components/register/register';
import Login from './components/login/login';
import NavBar  from './components/header/nav';
import Clinicican from './components/clinician';
import './App.css';
import Client from './components/client';
import Session from './components/session/index';
import ActionItems from './components/client/actionItems';
import Review from './components/session/review'
import { Provider } from 'react-redux';
import store from './store';
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    console.log("props in app", this.props)
    return (
      <Provider store={store}>
      <div>
        <NavBar/>
        <Routes>
          <Route path='/' exact element={<Login nagivate={this.props.nagivate}/>}/>
          <Route path="/register"  element={<Register/>}/>
          <Route path='/clinician' element={<Clinicican/>}/>
          <Route path='/client' element={<Client/>}/>
          <Route path='/session' element={<Session/>}/>
          <Route path='/action' element={<ActionItems/>}/>
          <Route path='/review' element={<Review/>}/>
        </Routes> 
      </div>
      </Provider>
    );

  }
}
export function APPWithRouter(props) {
  const nagivate  = useNavigate()
  return (<App nagivate={nagivate}></App>)
}
// export default App;
