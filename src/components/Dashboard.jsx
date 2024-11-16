import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import './Dashboard.css';

const Dashboard = () => {
  const [destinations, setDestinations] = useState([]);
  const [expandedReviews, setExpandedReviews] = useState({}); // Estado para manejar las reseñas expandidas
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Controla el estado del menú desplegable
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')); // Usuario autenticado
  const apiURL = 'https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs';

  // Cargar destinos creados por el usuario
  const fetchUserDestinations = async () => {
    try {
      const response = await axios.get(`${apiURL}?userId=${user.id}`);
      setDestinations(response.data);
    } catch (error) {
      console.error('Error al cargar destinos:', error);
      setError('No se pudieron cargar sus destinos');
    }
  };

  useEffect(() => {
    fetchUserDestinations();
  }, []);

  // Función para alternar la vista de la reseña
  const toggleReview = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id], // Cambia entre expandido y contraído para el destino específico
    }));
  };

  // Función para eliminar un destino
  const handleDeleteDestination = async (id) => {
    try {
      await axios.delete(`${apiURL}/${id}`);
      fetchUserDestinations(); // Refresca la lista de destinos
    } catch (error) {
      console.error('Error al eliminar destino:', error);
      setError('No se pudo eliminar el destino');
    }
  };

  // Función para redirigir a la página de edición
  const handleNavigateToEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        {/* Sección izquierda: Nombre del usuario */}
        <div className="user-info">
          <p>Bienvenido, {user.name || user.email}</p>
        </div>

        {/* Sección central: Botones "Ver Blog" y "Crear Nuevo Destino" */}
        <div className="header-buttons">
          <button onClick={() => navigate('/blog')} className="blog-button">
            Ver Blog
          </button>
          <button onClick={() => navigate('/create')} className="create-button">
            Crear Nuevo Destino
          </button>
        </div>

        {/* Sección derecha: Menú desplegable */}
        <div className="user-menu">
          <button onClick={() => setMenuOpen(!menuOpen)} className="menu-button">
            Menú
          </button>
          {menuOpen && (
            <div className="menu-dropdown">
              <button onClick={() => navigate('/my-profile')}>Modificar Credenciales</button>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-main">
        <h2 className="h2Dash">Mis Destinos Turísticos</h2>
      </div>

      {error && <p className="error">{error}</p>}

      {/* Lista de tarjetas de destinos */}
      <div className="destinations-list">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination-card">
            <h3>{destination.name}</h3>
            <p><strong>Ubicación:</strong> {destination.location}</p>
            <p>
              <strong>Reseña:</strong>{" "}
              {expandedReviews[destination.id]
                ? destination.review // Mostrar toda la reseña si está expandida
                : `${destination.review.substring(0, 100)}...`}{" "}
              {/* Mostrar solo los primeros 100 caracteres */}
              <span
                className="toggle-review"
                onClick={() => toggleReview(destination.id)}
              >
                {expandedReviews[destination.id] ? " Ver menos" : " Ver más"}
              </span>
            </p>

            {/* Contenedor para estrellas y botones */}
            <div className="card-footer">
              <StarRating rating={destination.rating} className="star-rating" />
              <div className="dashboard-buttons">
                <button
                  onClick={() => handleNavigateToEdit(destination.id)}
                  className="btnEditar"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteDestination(destination.id)}
                  className="btnEliminar"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;