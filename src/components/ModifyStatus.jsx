import React, { useState } from 'react';
import '../styles/ModifyStatus.css';

const ModifyStatus = () => {
  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    fechaPublicacion: '',
    estado: 'Disponible',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const estadosValidos = ['Disponible', 'En Préstamo'];
    if (!estadosValidos.includes(form.estado)) {
      alert('Estado no válido.');
      return;
    }

    console.log('Datos guardados:', form);
    // Aquí puedes agregar la lógica para enviar al backend
  };

  return (
<div className="contenedor-principal">
  <header className="header">
    <h1 className="titulo">KTJ LIBRERIA</h1>
    <div className="nav-links">
      <a href="/admin-panel">Volver</a>
      <a href="/">Cerrar Sesión</a>
    </div>
  </header>


      <main className="form-container">
        <h2>MODIFICAR ESTADO DE LIBRO</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Autor:</label>
            <input
              type="text"
              name="autor"
              value={form.autor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Publicacion:</label>
            <input
              type="date"
              name="fechaPublicacion"
              value={form.fechaPublicacion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nuevo Estado:</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              required
            >
              <option value="Disponible">Disponible</option>
              <option value="En Préstamo">En Préstamo</option>
            </select>
          </div>
          <div className="form-button">
            <button type="submit">Guardar</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ModifyStatus;
