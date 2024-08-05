import React from 'react';
import LoginContainer from './containers/login';
import CreateAccount from './containers/CreateAccount';
import ShelterContainer from './containers/ShelterContainer';
import NavBar from './components/NavBar';
import HumanContainer from './containers/HumanContainer';
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom"
import './styles/style.css';

const App = () => {

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log('Login submitted with:', username, password);
    // };

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
    // <section>
    //     <h1>PawMatch</h1>
    //     <h4>login</h4>
    //     <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>
    //           Username: 
    //           <input
    //             type="text"
    //             value={username}
    //             onchange={e => setUsername(e.target.value)}
    //           />
    //       </label>
    //     </div>  
    //     <div>
    //         <label>
    //             Password: 
    //             <input 
    //             type='password'
    //             value = {password}
    //             onchange={e => setPassword(e.target.value)}>
    //             </input>
    //         </label>
    //         </div>
    //     </form>
    //     <span><a href='/createAccount'>Create an account.</a></span>
    // </section>
    

  );
}

export default App;