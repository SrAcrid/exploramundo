import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const newUser = { name, email, password };
      await axios.post('https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/users', newUser);

      navigate('/login'); // Redirige a la página de inicio de sesión después de registrarse
    } catch (error) {
      console.error('Error al registrarse:', error);
      setError('Ocurrió un error al registrarse');
    }
  };

  return (
    <div className="auth-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
        {error && <p className="error">{error}</p>}
      </form>
      <button onClick={() => navigate('/')} className="back-button">
        Volver a la Página Principal
      </button>
    </div>
  );
};

export default RegisterPage;
