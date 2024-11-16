import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateDestination.css';

const CreateDestinationPage = () => {
  const [newDestination, setNewDestination] = useState({
    name: '',
    location: '',
    review: '',
    rating: 0,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiURL = 'https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs';

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDestination((prev) => ({ ...prev, [name]: value }));
  };

  // Crear un nuevo destino
  const handleCreateDestination = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user')); // Usuario autenticado
    const newDestinationWithUser = { ...newDestination, userId: user.id };
  
    try {
      await axios.post(apiURL, newDestinationWithUser);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al crear destino:', error);
      setError('No se pudo crear el destino');
    }
  };
  

  return (
    <div className="create-container">
      <h2>Crear Nuevo Destino Turístico</h2>
      <form onSubmit={handleCreateDestination}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del destino"
          value={newDestination.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          value={newDestination.location}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="review"
          placeholder="Reseña"
          value={newDestination.review}
          onChange={handleInputChange}
          required
        ></textarea>
        <input
          type="number"
          name="rating"
          placeholder="Calificación"
          value={newDestination.rating}
          onChange={handleInputChange}
          min="1"
          max="5"
          required
        />
        <button type="submit">Crear Destino</button>
        {error && <p className="error">{error}</p>}
      </form>
      <button onClick={() => navigate('/dashboard')} className="back-button">
        Volver a la Dashboard
      </button>
    </div>
  );
};

export default CreateDestinationPage;
