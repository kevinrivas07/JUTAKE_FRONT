import { useState } from 'react';
import '../Styles/RegisterLoan.css';

const LoanForm = () => {
  const [loanData, setLoanData] = useState({
    libro: '',
    usuario: 'Nombre del Usuario', // Ejemplo de dato pre-cargado
    fechaDevolucion: '',
    estado: 'pendiente'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({
      ...loanData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del préstamo:', loanData);
    // Lógica para enviar los datos al backend
  };

  return (
    <div className="contenedor-principal">
      <header className="header">
        <h1 className="titulo">KTJ LIBRERIA</h1>
        <div className="nav-links">
          <a href="/admin">Volver</a>
          <a href="/">Cerrar Sesión</a>
        </div>
      </header>
      
        {/* Formulario de Préstamo */}
        <form onSubmit={handleSubmit} className="loan-form">
          <h2 className="form-title">REGISTRAR PRÉSTAMO</h2>
          
          <div className="form-group">
            <label htmlFor="libro">Libro:</label>
            <input
              type="text"
              id="libro"
              name="libro"
              value={loanData.libro}
              onChange={handleChange}
              required
              placeholder="Título del libro"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="usuario">Usuario:</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={loanData.usuario}
              onChange={handleChange}
              required
              placeholder="Nombre del usuario"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="fechaDevolucion">Fecha de devolución:</label>
            <input
              type="date"
              id="fechaDevolucion"
              name="fechaDevolucion"
              value={loanData.fechaDevolucion}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <select
              id="estado"
              name="estado"
              value={loanData.estado}
              onChange={handleChange}
              className="status-select"
            >
              <option value="pendiente">Pendiente</option>
              <option value="entregado">Entregado</option>
              <option value="atrasado">Atrasado</option>
              <option value="devuelto">Devuelto</option>
            </select>
          </div>
          
          <button type="submit" className="submit-btn">Registrar Préstamo</button>
        </form>
      </div>
 
  );
};

export default LoanForm;