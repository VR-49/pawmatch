import React, { useEffect, useState } from 'react';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/login';
import CreateAccount from './containers/CreateAccount';
import ShelterContainer from './containers/ShelterContainer';
import NavBar from './components/NavBar';
import HumanContainer from './containers/HumanContainer';
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import ProfileContainer from './containers/ProfileContainer';
import ProtectedRoute from './components/ProtectedRoute';

import './styles/styles.scss';
import ShelterAnimalCard from './components/ShelterAnimalCard';


const App = () => {
  const [auth, setAuth] = useState();
  const [username, setUsername] = useState(null);

  console.log('App username:', username);

  return (
    <>
      <NavBar username={username}/>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/home" element={<HomeContainer />} />
        <Route path="/login" element={<LoginContainer setAppUsername={setUsername} auth = {auth} setAuth = {setAuth}/>} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/shelters" element={<ShelterContainer />} />
        {/* <Route path="/login" element={<LoginContainer />} /> why do we have 2 exactly the same login routes?*/}
        <Route path="/human-dashboard" element={<HumanContainer />} />
        <Route path="/org-dashboard" element={<ShelterContainer />} />
        <Route path="/shelter-animals" element={<ShelterAnimalCard />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfileContainer />} auth = {auth} setAuth = {setAuth}/>} />
      </Routes>
    </>

  );
}

export default App;