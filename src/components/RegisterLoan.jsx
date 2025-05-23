// src/componentes/RegisterLoan.jsx
import { useState, useEffect } from 'react';
import '../Styles/RegisterLoan.css';

const LoanForm = () => {
  const [loanData, setLoanData] = useState({
    book: '',
    user: '',
    loanDate: new Date().toISOString().split('T')[0],
    returnDate: '',
  });

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/books');
        const data = await res.json();
        setBooks(data.filter(book => book.available)); // Solo libros disponibles
      } catch (err) {
        console.error('Error al cargar libros:', err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error al cargar usuarios:', err);
      }
    };

    fetchBooks();
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          book: loanData.book,
          user: loanData.user,
          loanDate: new Date(loanData.loanDate),
          returnDate: loanData.returnDate ? new Date(loanData.returnDate) : null,
          returned: false,
        }),
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
          <select
            id="book"
            name="book"
            value={loanData.book}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un libro</option>
            {books.map((book) => (
              <option key={book.id} value={book.title}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="user">Nombre del Usuario:</label>
          <select
            id="user"
            name="user"
            value={loanData.user}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un usuario</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
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

        <button type="submit" className="submit-btn">
          Registrar Préstamo
        </button>
      </form>
    </div>
  );
};

export default LoanForm;
