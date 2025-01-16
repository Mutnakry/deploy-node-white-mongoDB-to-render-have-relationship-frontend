// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './View/HomePage';
import Login from './components/Login'
import Register from './components/Register';
import UserLogin from './View/personal/UserLogin';
import ModalesDetails from './View/modale/ModalePage';
import HomeDetailLession from './View/lessions/Home.tsx';



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
        <Route path='/modales/:courseId/course' element={<ModalesDetails/>}/>
        {/* <Route path="/course/:categoryId/modales/:detailcategoryId" element={isAuthenticated ? <Lessonses  /> : <Navigate to="/" />}/> */}
        {/* <Route path="/course/:courseId/modales/:modaleId/lesson/:submodaleId" element={<Lessonses />} /> */}

        <Route path="/course/:courseId/modales/:modaleId/lesson/:submodaleId" element={<HomeDetailLession />} />


      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;



// project 2
///email=nakrymut375@gmail.com
///pass=123
