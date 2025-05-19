import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← NUEVO
import '../Styles/AdminPanel.css';

const booksData = [
  {
    titulo: 'Don Quijote de la Mancha',
    autor: 'Miguel De Cervante',
    estado: 'Disponible',
    categoria: 'Clásico'
  },
  {
    titulo: 'Cien años de Soledad',
    autor: 'Gabriel Garcia Marquez',
    estado: 'Prestado',
    categoria: 'Realismo Mágico'
  },
  {
    titulo: 'En agosto nos vemos',
    autor: 'Gabriel Garcia Marquez',
    estado: 'Disponible',
    categoria: 'Realismo Mágico'
  }
];

export default function AdminPanel() {
  const navigate = useNavigate(); // ← NUEVO

  const [autorFiltro, setAutorFiltro] = useState(null);
  const [tituloFiltro, setTituloFiltro] = useState(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState(null);
  const [mostrarMenuAutor, setMostrarMenuAutor] = useState(false);
  const [mostrarMenuTitulo, setMostrarMenuTitulo] = useState(false);
  const [mostrarMenuCategoria, setMostrarMenuCategoria] = useState(false);

  const autoresUnicos = [...new Set(booksData.map(b => b.autor))];
  const titulosUnicos = [...new Set(booksData.map(b => b.titulo))];
  const categoriasUnicas = [...new Set(booksData.map(b => b.categoria || 'N/A'))];

  const librosFiltrados = booksData.filter(libro => {
    const coincideAutor = autorFiltro ? libro.autor === autorFiltro : true;
    const coincideTitulo = tituloFiltro ? libro.titulo === tituloFiltro : true;
    const coincideCategoria = categoriaFiltro ? (libro.categoria || 'N/A') === categoriaFiltro : true;
    return coincideAutor && coincideTitulo && coincideCategoria;
  });

  const handleFiltroAutor = (autor) => {
    setAutorFiltro(autor);
    setMostrarMenuAutor(false);
  };

  const handleFiltroTitulo = (titulo) => {
    setTituloFiltro(titulo);
    setMostrarMenuTitulo(false);
  };

  const handleFiltroCategoria = (categoria) => {
    setCategoriaFiltro(categoria);
    setMostrarMenuCategoria(false);
  };


  return (
    <div className="admin-container">
      <div className="header-admin">
        <button className='edit-button icon-button' onClick={() => navigate('/admin')}>
          <img src='/src/assets/hacia-atras.png' alt='Atras' />
        </button>
        <h1>PANEL DEL ADMINISTRADOR</h1>
      </div>

      <div className="actions">
        <button className="btn agregar"onClick={() => navigate('/addBook')}>
            Agregar libro
        </button>
        <button className="btn modificar" onClick={() => navigate('/modify-status')}>
            Modificar Estado
        </button>

        <div className="search-box">
          <input type="text" placeholder="Buscar" />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <table className="books-table">
        <thead>
          <tr>
            <th style={{ position: 'relative' }}>
              TITULO
              <span className="filtro-icon" onClick={() => setMostrarMenuTitulo(!mostrarMenuTitulo)}>▼</span>
              {mostrarMenuTitulo && (
                <ul className="dropdown-menu">
                  <li onClick={() => handleFiltroTitulo(null)}>Todos</li>
                  {titulosUnicos.map((titulo, idx) => (
                    <li key={idx} onClick={() => handleFiltroTitulo(titulo)}>{titulo}</li>
                  ))}
                </ul>
              )}
            </th>

            <th style={{ position: 'relative' }}>
              AUTOR
              <span className="filtro-icon" onClick={() => setMostrarMenuAutor(!mostrarMenuAutor)}>▼</span>
              {mostrarMenuAutor && (
                <ul className="dropdown-menu">
                  <li onClick={() => handleFiltroAutor(null)}>Todos</li>
                  {autoresUnicos.map((autor, idx) => (
                    <li key={idx} onClick={() => handleFiltroAutor(autor)}>{autor}</li>
                  ))}
                </ul>
              )}
            </th>

            <th>ESTADO</th>

            <th style={{ position: 'relative' }}>
              CATEGORIA
              <span className="filtro-icon" onClick={() => setMostrarMenuCategoria(!mostrarMenuCategoria)}>▼</span>
              {mostrarMenuCategoria && (
                <ul className="dropdown-menu">
                  <li onClick={() => handleFiltroCategoria(null)}>Todos</li>
                  {categoriasUnicas.map((categoria, idx) => (
                    <li key={idx} onClick={() => handleFiltroCategoria(categoria)}>{categoria}</li>
                  ))}
                </ul>
              )}
            </th>

            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {librosFiltrados.map((libro, index) => (
            <tr key={index}>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>{libro.estado}</td>
              <td>{libro.categoria || 'N/A'}</td>
              <td className="acciones">
                <button className="edit-button icon-button" onClick={() => navigate('/update')}>
                  <img src='/src/assets/pencil_12126459.png' alt='Editar' />
                </button>
                <button className="delete-button icon-button">
                  <img src='/src/assets/trash_13444199.png' alt='Eliminar' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
