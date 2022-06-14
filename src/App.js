import React from 'react';
import {BrowserRouter, Route,Routes} from "react-router-dom"
import Register from './components/register/register';
import Login from './components/login/login';
import NavBar  from './components/header/nav';
import './App.css'
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div>
        <NavBar/>
        <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Login/>}/>
          <Route path="/register"  element={<Register/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    );

  }
}

export default App;
