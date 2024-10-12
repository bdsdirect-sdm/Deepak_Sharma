import React from 'react';
import './App.css';
import { Routes , Route} from 'react-router-dom';
import Register from './components/Register';

import UpdateForm from './components/UpdateForm';
import Profile from './components/Profile';
import Login from './components/Login';
import AgencyDeshboard from './components/AgencyDeshboard';
import SeekerDashBoard from './components/SeekerDashBoard';

const App : React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element = {<Home/>}/> */}
        <Route path = "/" element = {<Register/>}/>
        <Route path='/login' element ={<Login/>}/>
        <Route path="/update/:id"  element = {< UpdateForm/>}/>
        <Route path = "/profile/:id" element = {<Profile/>}/>
        <Route path = "/dashboard" element = {
          localStorage.getItem("user_type") === "Job_Seeker" ?(<SeekerDashBoard/>): (<AgencyDeshboard/>)
        }/>
        
      </Routes>
    </div>
  );
}

export default App;
