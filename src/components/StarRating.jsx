// StarRating.jsx
import React from 'react';

const StarRating = ({ rating }) => {
  // Crea un array de longitud 5 y renderiza una estrella llena o vacía según la calificación
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
