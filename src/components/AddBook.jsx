import React, { useRef, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../styles/AddBook.css';

const AddBook = () => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('/src/assets/add.png');

  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    date: '',
    publisher: '',
    year: '',
  });

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el libro');
      }

      alert('Libro guardado correctamente');
      setForm({
        title: '',
        author: '',
        genre: '',
        date: '',
        publisher: '',
        year: '',
      });
      setPreviewImage('/src/assets/add.png');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al guardar el libro');
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

      <h2 className='title'>Añadir Libro</h2>

      <Form className="book-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Título:</Label>
          <Input type="text" name="title" id="title" value={form.title} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label for="author">Autor:</Label>
          <Input type="text" name="author" id="author" value={form.author} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label for="genre">Categoría:</Label>
          <Input type="text" name="genre" id="genre" value={form.genre} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label for="date">Fecha de Publicación:</Label>
          <Input type="date" name="date" id="date" value={form.date} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label for="publisher">Editorial:</Label>
          <Input type="text" name="publisher" id="publisher" value={form.publisher} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label for="year">Año de publicación:</Label>
          <Input type="number" name="year" id="year" value={form.year} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Agregar Imagen:</Label><br />
          <img
            src={previewImage}
            alt="Seleccionar"
            onClick={handleImageClick}
            className='select-image'
          />
          <Input
            type="file"
            name="image"
            id="image"
            innerRef={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </FormGroup>

        <div className="separator"></div>

        <Button color="primary" className="submit-btn" type="submit">Guardar Libro</Button>
      </Form>
    </div>
  );
};

export default AddBook;
