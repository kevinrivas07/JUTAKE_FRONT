import React, { useState } from 'react';
import '../styles/ModifyStatus.css';

const ModifyStatus = () => {
  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    estado: 'Disponible',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const estadosValidos = ['Disponible', 'En Préstamo'];
    if (!estadosValidos.includes(form.estado)) {
      alert('Estado no válido.');
      return;
    }

    try {
      // Paso 1: Buscar el libro por título y autor
      const query = new URLSearchParams({
        title: form.titulo,
        author: form.autor,
      });

      const resBusqueda = await fetch(`http://localhost:3000/api/books?${query}`);
      const libros = await resBusqueda.json();

      if (!libros.length) {
        alert('Libro no encontrado');
        return;
      }

      const libro = libros[0]; // Tomamos el primero que coincida
      const estadoDisponible = form.estado === 'Disponible';

      // Paso 2: Enviar PATCH al backend para actualizar disponibilidad
      const resUpdate = await fetch(`http://localhost:3000/api/books/${libro.id}/availability`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: estadoDisponible }),
      });

      if (!resUpdate.ok) {
        throw new Error('Error al actualizar el estado del libro');
      }

      alert('Estado actualizado correctamente');
      setForm({
        titulo: '',
        autor: '',
        estado: 'Disponible',
      });
    } catch (error) {
      console.error(error);
      alert('Error al modificar el estado del libro');
    }
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
