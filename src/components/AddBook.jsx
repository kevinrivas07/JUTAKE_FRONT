import React, { useRef, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../Styles/AddBook.css';

const AddBook = () => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState('/src/assets/add.png');

  const handleImageClick = () => {
    fileInputRef.current.click(); // Simula clic en input oculto
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl); // Actualiza la vista previa
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

      <Form className="book-form">
        <FormGroup>
          <Label for="title">Título:</Label>
          <Input type="text" name="title" id="title" placeholder=" " />
        </FormGroup>

        <FormGroup>
          <Label for="author">Autor:</Label>
          <Input type="text" name="author" id="author" placeholder=" " />
        </FormGroup>

        <FormGroup>
          <Label for="category">Categoría:</Label>
          <Input type="text" name="category" id="category" placeholder=" " />
        </FormGroup>

        <FormGroup>
          <Label for="publishDate">Fecha de Publicación:</Label>
          <Input type="date" name="publishDate" id="publishDate" />
        </FormGroup>

        <FormGroup>
          <Label for="publisher">Editorial:</Label>
          <Input type="text" name="publisher" id="publisher" placeholder=" " />
        </FormGroup>

        <FormGroup>
          <Label for="year">Año de publicación:</Label>
          <Input type="number" name="year" id="year" placeholder=" " />
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

        <Button color="primary" className="submit-btn">Guardar Libro</Button>
      </Form>
    </div>
  );
};

export default AddBook;
