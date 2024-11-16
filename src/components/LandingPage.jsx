import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'; // Estilos específicos para la landing page

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Bienvenido a ExploraMundo</h1>
      <p>Descubre y comparte los destinos turísticos más fascinantes alrededor del mundo.</p>
      
      <div className="button-container">
        <button onClick={() => navigate('/login')} className="landing-button">
          Iniciar Sesión
        </button>
        <button onClick={() => navigate('/register')} className="landing-button">
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
