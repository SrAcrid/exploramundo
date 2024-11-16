import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import EditDestinationPage from './components/EditDestinationPage';
import CreateDestinationPage from './components/CreateDestinationPage';
import BlogPage from './components/BlogPage';
import MyProfilePage from './components/MyProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateDestinationPage />} />
        <Route path="/edit/:id" element={<EditDestinationPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        {/* Agregar otras rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;
