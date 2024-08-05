import React from 'react';
import LoginContainer from './containers/login';
import CreateAccount from './containers/CreateAccount';
import ShelterContainer from './containers/ShelterContainer';
import NavBar from './components/NavBar';
import HumanContainer from './containers/HumanContainer';
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom"

import './styles/style.css';


const App = () => {


  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/shelters" element={<ShelterContainer />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/human-dashboard" element={<HumanContainer />} />
    </Routes>
    </>

  );
}

export default App;