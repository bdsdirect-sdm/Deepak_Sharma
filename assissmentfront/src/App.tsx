import React from 'react';
import './App.css';
import { Routes , Route, Navigate} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AgencyDeshboard from './pages/AgencyDeshboard';
import SeekerDashBoard from './pages/SeekerDashBoard';
import Error from './pages/Error';
import { useSelector } from 'react-redux';
import OpenRoute from './components/routeComponent/OpenRoute';
import ChatBox from './pages/ChatBox';  


const App : React.FC = () => {

  const {user_type} = useSelector((state:any) => state.user)
  console.log(user_type,"userType from redux")

  const {user} = useSelector((state:any) =>state.user)

  // const user_type : string | null = localStorage.getItem("user_type")
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element = {<Home/>}/> */}
        <Route path = "/" element = {<Register/>}/>
        <Route path='/login' element ={
          <OpenRoute>
            <Login/>
          </OpenRoute>
        }/>

        
        {
          user_type === "Job_Seeker" && (<Route path = "/dashboard" element={<SeekerDashBoard/>}/>) 
        }
        {
          user_type === "Agency"  && (<Route path = "/dashboard" element={<AgencyDeshboard/>}/>)
        }
        {
          user && <Route path='/chatbox/:roomid' element = {<ChatBox/>}/>
        }
        <Route path='*' element={<Navigate to={"/login"}/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
