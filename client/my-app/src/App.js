import {  Route, Routes } from 'react-router-dom';
import "./App.css";
import Register from './Component/Register_Page.js';
import Login from './Component/Login.js';
import HomePage from './Component/HomePage';
import ErrorPage from './Component/ErrorPage';
import UserReference from './Component/ReferalPage';

function App() {
  return (
    <Routes >
     
      <Route path='/' element={<HomePage />} />


      <Route path='/Register' element={<Register />} />

      <Route path='/Login' element={<Login />} />

      <Route path='/UserReference' element={<UserReference />} />



    {/* this route for unknown page access */}
      <Route path='/*' element={<ErrorPage />} />

    </Routes>
       
  ); 
}   

export default App;
