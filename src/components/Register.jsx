import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import '../Styles/Login.css';
import libreriaImg from '../assets/libreria.png';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      card: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { name, card, phone, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users', {
        name,
        card,
        phone,
        email,
        password,
      });

      console.log('Registro exitoso:', response.data);
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      // Redirección al login si usas React Router, por ejemplo:
      // this.props.navigate('/'); o this.props.history.push('/')
    } catch (error) {
      console.error('Error en el registro:', error.response?.data || error.message);
      alert('Error al registrarse. Revisa los datos o intenta más tarde.');
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="image-container">
          <img src={libreriaImg} alt="Librería" className="login-image" />
        </div>
        <div className="form-container">
          <h1>REGISTRO</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Nombre</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Nombre"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="card">Cédula</Label>
              <Input
                type="text"
                name="card"
                id="card"
                placeholder="Número de cédula"
                value={this.state.card}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Teléfono</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder="Número de teléfono"
                value={this.state.phone}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Correo electrónico</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Contraseña</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirmar contraseña</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="******"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button>Registrarse</Button>
            <p>
              ¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
