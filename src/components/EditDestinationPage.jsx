import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditDestination.css';

const EditDestinationPage = () => {
  const { id } = useParams(); // Obtiene el ID del destino desde los parámetros de la URL
  const navigate = useNavigate();

  const [destination, setDestination] = useState({
    name: '',
    location: '',
    review: '',
    rating: 0,
  });
  const [error, setError] = useState(null);

  // Cargar los detalles del destino
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axios.get(`https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs/${id}`);
        setDestination(response.data);
      } catch (error) {
        console.error('Error al cargar el destino:', error);
        setError('Ocurrió un error al cargar el destino');
      }
    };

    fetchDestination();
  }, [id]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDestination((prev) => ({ ...prev, [name]: value }));
  };

  // Actualizar el destino
  const handleUpdateDestination = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/blogs/${id}`, destination);
      navigate('/dashboard'); // Redirige a la dashboard después de actualizar
    } catch (error) {
      console.error('Error al actualizar el destino:', error);
      setError('No se pudo actualizar el destino');
    }
  };

  return (
    <div className="edit-container">
      <h2>Editar Destino Turístico</h2>
      <form onSubmit={handleUpdateDestination}>
        <input
          type="text"
          name="name"
          placeholder="Nombre del destino"
          value={destination.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Ubicación"
          value={destination.location}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="review"
          placeholder="Reseña"
          value={destination.review}
          onChange={handleInputChange}
          required
        ></textarea>
        <input
          type="number"
          name="rating"
          placeholder="Calificación"
          value={destination.rating}
          onChange={handleInputChange}
          min="1"
          max="5"
          required
        />
        <button type="submit">Guardar Cambios</button>
        {error && <p className="error">{error}</p>}
      </form>
      <button onClick={() => navigate('/dashboard')} className="back-button">
        Volver a la Dashboard
      </button>
    </div>
  );
};

export default EditDestinationPage;
