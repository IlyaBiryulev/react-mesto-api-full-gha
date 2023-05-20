import React from 'react';
import Header from './Header.js';
import Authentication from './Authentication.js';

function Register({onRegister}) {
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
      onRegister(formValue)
    }

    return (
        <div>
          <Authentication
            name={'register'}
            title={'Регистрация'}
            btnSubmit={'Зарегистрироваться'}
            isLogin={'Уже зарегистророваны? Войти'}
            onSubmit={handleSubmit}
          >
            <input
                type="email"
                name="email"
                form="register"
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
                form="register"
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

export default Register;
