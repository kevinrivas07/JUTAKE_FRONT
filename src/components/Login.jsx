import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'; // 👈 Agregado
import '../Styles/Login.css';
import libreriaImg from '../assets/libreria.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email: this.state.email,
        password: this.state.password,
      });

      console.log('Login exitoso:', response.data);
      // Aquí puedes guardar el token o redirigir al dashboard
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      alert('Credenciales inválidas o error en el servidor');
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="image-container">
          <img src={libreriaImg} alt="Librería" className="login-image" />
        </div>
        <div className="form-container">
          <h1>INICIO DE SESION</h1>
          <Form onSubmit={this.handleSubmit}>
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
            <Link to="/admin"> 
            <Button>Iniciar sesión</Button>
            </Link>
            <p>
              ¿Aun no estás registrado? <Link to="/register">Regístrate</Link>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
