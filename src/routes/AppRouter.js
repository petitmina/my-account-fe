import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { useSelector } from 'react-redux';

const AppRouter = () => {
  const { user } = useSelector((state) => state.user)
  return (
    <Routes>

        <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/login' element={<LoginPage/>}/>
    </Routes>
    
  )
}

export default AppRouter
