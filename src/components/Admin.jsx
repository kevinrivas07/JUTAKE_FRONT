// src/components/Admin.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Admin.css';

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const goToGestionLibros = () => {
    navigate('/admin-panel');

  };
  const goToUpdateBook = () => {
    navigate('/register-loan');
    }

  return (
    <div className="contenedor-principal">
      {/* Encabezado */}
      <header className="header">
        <h1 className="titulo">KTJ LIBRERIA</h1>
        <div className="nav-links">
          <a href="/" onClick={handleLogout}>Cerrar Sesión</a>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="home-admin">
        <h1 className="admin-title">Panel de Administración</h1>

        <div className="admin-buttons">
          <button onClick={goToGestionLibros} className="admin-button">
            Gestión de Libros
          </button>

          <button onClick={goToUpdateBook} className="admin-button">
            Registrar Prestamos
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
