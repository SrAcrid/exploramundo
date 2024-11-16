// MyProfilePage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyProfilePage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const apiURL = `https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/users/${user.id}`;

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(apiURL, { email, password });
      localStorage.setItem('user', JSON.stringify({ ...user, email })); // Actualiza el localStorage
      setMessage('Credenciales actualizadas con éxito');
    } catch (error) {
      console.error('Error al actualizar credenciales:', error);
      setMessage('Error al actualizar las credenciales');
    }
  };

  return (
    <div className="profile-container">
      <h2>Modificar Credenciales</h2>
      <form onSubmit={handleUpdate}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Guardar Cambios</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => navigate('/dashboard')} className="back-button">
        Volver al Dashboard
      </button>
    </div>
  );
};

export default MyProfilePage;
