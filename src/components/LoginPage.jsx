import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/users`);
      const users = response.data;
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        // Suponiendo que el usuario autenticado se almacena en el localStorage
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard'); // Redirige al dashboard después de iniciar sesión
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Ingresar</button>
        {error && <p className="error">{error}</p>}
      </form>
      <button onClick={() => navigate('/')} className="back-button">
        Volver a la Página Principal
      </button>
    </div>
  );
};

export default LoginPage;
