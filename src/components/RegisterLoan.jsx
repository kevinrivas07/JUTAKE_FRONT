import { useState } from 'react';
import '../Styles/RegisterLoan.css';

const LoanForm = () => {
  const [loanData, setLoanData] = useState({
    book: '',
    user: '',
    loanDate: new Date().toISOString().split('T')[0],
    returnDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({
      ...loanData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          book: loanData.book,
          user: loanData.user,
          loanDate: new Date(loanData.loanDate),
          returnDate: loanData.returnDate ? new Date(loanData.returnDate) : null,
          returned: false
        })
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      alert('Préstamo registrado correctamente');
    } catch (error) {
      console.error('Error al registrar el préstamo:', error);
      alert('Error al registrar el préstamo');
    }
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

      <form onSubmit={handleSubmit} className="loan-form">
        <h2 className="form-title">REGISTRAR PRÉSTAMO</h2>

        <div className="form-group">
          <label htmlFor="book">Nombre del Libro:</label>
          <input
            type="text"
            id="book"
            name="book"
            value={loanData.book}
            onChange={handleChange}
            required
            placeholder="Ej: Cien Años de Soledad"
          />
        </div>

        <div className="form-group">
          <label htmlFor="user">Nombre del Usuario:</label>
          <input
            type="text"
            id="user"
            name="user"
            value={loanData.user}
            onChange={handleChange}
            required
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="form-group">
          <label htmlFor="loanDate">Fecha del Préstamo:</label>
          <input
            type="date"
            id="loanDate"
            name="loanDate"
            value={loanData.loanDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="returnDate">Fecha de Devolución:</label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={loanData.returnDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">Registrar Préstamo</button>
      </form>
    </div>
  );
};

export default LoanForm;
