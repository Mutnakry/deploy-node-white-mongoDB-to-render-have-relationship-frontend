// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './View/HomePage';
import Login from './components/Login'
import Register from './components/Register';
import UserLogin from './View/personal/UserLogin';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path='/userLogin' element={<UserLogin/>}/>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
