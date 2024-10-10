import React from 'react';
import './App.css';
import { Routes , Route} from 'react-router-dom';
// import SignUpAndLogin from './components/SignUp';
// import Edit from './components/Edit';
// import SignUP from './components/SignUp';
// import Home from './components/Home';
// import  Login from './components/Login';
// import SignupOrEditForm from './components/SignupLoginForm';
// import SignupOrEditForm from './components/SignupLoginForm';
import SignupOrEditForm from './components/SignupForm';
import UpdateForm from './components/UpdateForm';
import Profile from './components/Profile';

const App : React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element = {<Home/>}/> */}
        <Route path = "/" element = {<SignupOrEditForm mode ={"signup"}/>}/>
        <Route path="/update/:id"  element = {< UpdateForm/>}/>
        <Route path = "/profile/:id" element = {<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
