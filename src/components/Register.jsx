import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../Styles/Login.css';
import libreriaImg from '../assets/libreria.png';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.register(this.state.email, this.state.password, this.state.confirmPassword);
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
                type="text"
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
                type="text"
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