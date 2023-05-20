import React from 'react';
import Header from './Header.js';
import {Link} from 'react-router-dom';
import Authentication from './Authentication.js';

function Login({onLogin}) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

    const handleSubmit = (e) => {
      e.preventDefault();
      onLogin(formValue)
    }

  return (
    <div>
      <Authentication
        name={'login'}
        title={'Вход'}
        btnSubmit={'Войти'}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          form="login"
          id="email-input"
          placeholder="Email"
          className="auth__form-input"
          required
          value={formValue.email}
          onChange={handleChange}
        />
        <span className="auth__form-input-error"></span>
        <input
          type="password"
          name="password"
          form="login"
          id="password-input"
          placeholder="Пароль"
          className="auth__form-input"
          required
          value={formValue.password}
          onChange={handleChange}
        />
        <span className="auth__form-input-error"></span>
      </Authentication>
    </div>
  );
}

export default Login;
