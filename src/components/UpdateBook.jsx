// src/componentes/UpdateBook.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../Styles/AddBook.css';

const UpdateBook = () => {
  const { id } = useParams();            // 1. Obtenemos el ID
  const navigate = useNavigate();        // para redirigir tras guardar
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('/src/assets/add.png');
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    category: '',
    publishDate: '',
    publisher: '',
    year: '',
    image: ''
  });

  // 2. Cargar libro al montar
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`);
        if (!response.ok) throw new Error('Libro no encontrado');
        const data = await response.json();

        setBookData({
          title:     data.title,
          author:    data.author,
          category:  data.genre,               // si en tu entidad es genre
          publishDate: data.date?.split('T')[0] || '',
          publisher: data.publisher,
          year:      data.year,
          image:     data.image || ''
        });

        if (data.image) setPreviewImage(data.image);
      } catch (error) {
        console.error('Error al cargar el libro:', error);
      }
    };
    fetchBook();
  }, [id]);

  // Manejo de cambios en inputs
  const handleInputChange = e => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  // Foto
  const handleImageClick = () => fileInputRef.current.click();
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setBookData({ ...bookData, image: imageUrl });
    }
  };

  // 4. Enviar PUT
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/books/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: bookData.title,
            author: bookData.author,
            genre: bookData.category,        // coincide con tu entidad
            date: bookData.publishDate,
            publisher: bookData.publisher,
            year: Number(bookData.year),
            image: bookData.image
          })
        }
      );
      if (!response.ok) throw new Error('Error al actualizar');
      alert('Libro actualizado correctamente');
      navigate('/admin-panel');  // redirige al admin tras guardar
    } catch (error) {
      console.error('Error al guardar el libro:', error);
      alert('Error al actualizar el libro');
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

      <h2 className="title">
        Actualizar Libro: <span>{bookData.title}</span>
      </h2>

      <Form className="book-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Título:</Label>
          <Input
            type="text"
            name="title"
            id="title"
            value={bookData.title}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="author">Autor:</Label>
          <Input
            type="text"
            name="author"
            id="author"
            value={bookData.author}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="category">Categoría:</Label>
          <Input
            type="text"
            name="category"
            id="category"
            value={bookData.category}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="publishDate">Fecha de Publicación:</Label>
          <Input
            type="date"
            name="publishDate"
            id="publishDate"
            value={bookData.publishDate}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="publisher">Editorial:</Label>
          <Input
            type="text"
            name="publisher"
            id="publisher"
            value={bookData.publisher}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="year">Año de publicación:</Label>
          <Input
            type="number"
            name="year"
            id="year"
            value={bookData.year}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Imagen:</Label><br />
          <img
            src={previewImage}
            alt="Seleccionar"
            onClick={handleImageClick}
            className="select-image"
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
        <Button color="primary" className="submit-btn">
          Guardar Libro
        </Button>
      </Form>
    </div>
  );
};

export default UpdateBook;
