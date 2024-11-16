import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import './BlogPage.css';

const BlogPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [expandedReviews, setExpandedReviews] = useState({}); // Estado para las reseñas expandidas
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Controla el estado del menú desplegable
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')); // Usuario autenticado
  const apiURL = 'https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs';

  // Función para cargar todos los destinos
  const fetchDestinations = async () => {
    try {
      const response = await axios.get(apiURL);
      setDestinations(response.data);
    } catch (error) {
      console.error('Error al cargar destinos:', error);
      setError('No se pudieron cargar los destinos');
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Alternar la vista de una reseña específica
  const toggleReview = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id], // Alternar entre expandido y contraído
    }));
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="blog-container">
      <div className="blog-header">
        {/* Sección izquierda: Título del blog */}
        <h2>Explora Todos los Destinos Turísticos</h2>

        {/* Sección derecha: Menú desplegable */}
        <div className="user-menu">
          <button onClick={() => setMenuOpen(!menuOpen)} className="menu-button">
            Menú
          </button>
          {menuOpen && (
            <div className="menu-dropdown">
              <button onClick={() => navigate('/dashboard')}>Mi Dashboard</button>
              <button onClick={() => navigate('/my-profile')}>Modificar Credenciales</button>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          )}
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="destinations-list">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination-card">
            <h3>{destination.name}</h3>
            <p><strong>Ubicación:</strong> {destination.location}</p>
            <p>
              <strong>Reseña:</strong>{" "}
              {expandedReviews[destination.id]
                ? destination.review // Mostrar toda la reseña si está expandida
                : `${destination.review.substring(0, 100)}...`}{" "} {/* Abreviar si no está expandida */}
              <span
                className="toggle-review"
                onClick={() => toggleReview(destination.id)}
              >
                {expandedReviews[destination.id] ? " Ver menos" : " Ver más"}
              </span>
            </p>
            <StarRating rating={destination.rating} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;