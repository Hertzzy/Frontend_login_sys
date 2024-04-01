import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/authContext';

import PropTypes from 'prop-types';

import Auth from './pages/Auth/Auth';
import Register from './pages/Register/Register';
import Home from './pages/Home/index';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Localization from './pages/Localization/Localization';
import Profile from './pages/Profile/Profile';
import Admin from './pages/Admin/Admin';


import Navbar from './components/Navbar/Navbar';
import Footer from './components/Foorter/Footer';

const AppRoutes = () => {
  const Private = ({ children }) => {
    Private.propTypes = {
      children: PropTypes.string.isRequired
    };
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="loading">Carregando...</div>;
    }
    // Se não tiver authenticado não sai da dela de login
    if (!authenticated) {
      return <Navigate to="/auth/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth/login" element={<Auth />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={
            <>
              <Navbar />  
              <Home />
              <Footer />
            </>
          } />
          <Route exact path="/about" element={
            <>
              <Navbar />  
              <About />
              <Footer />
            </>
          } />
          <Route exact path="/projects" element={
            <>
              <Navbar />  
              <Projects />
              <Footer />
            </>
          } />
          <Route exact path="/localization" element={
            <>
              <Navbar />  
              <Localization />
              <Footer />
            </>
          } />
           <Route exact path="/profile" element={
            <Private>
              <Navbar />  
              <Profile />
              <Footer />
            </Private>
          } />
           <Route exact path="/admin" element={
            <Private>
              <Navbar />  
              <Admin />
            </Private>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
