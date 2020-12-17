import React from "react";
import { Link } from "react-router-dom";

export default function Register({handleRegister}) {
  const [data, setData] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
      console.log(data)
    e.preventDefault();
    let { email, password } = data;
    handleRegister(password, email);
  };

  return (
      <div className="sign-form">
    <h1 className="sign-form__header">Регистрация</h1>
    <form action="#" onSubmit={handleSubmit}>
      <input
        className="sign-form__input"
        name='email'
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
      ></input>
      <input
        className="sign-form__input"
        name='password'
        type="password"
        placeholder="Пароль"
        value={data.password}
        onChange={handleChange}
        required
      ></input>
      <button type="submit" className="sign-form__button">Зарегистрироваться</button>
      <span className="sign-form__span">
        Уже зарегистрированы?{" "}
        <Link className="sign-form__to-sign-in" to="/sign-in">
          Войти
        </Link>
      </span>
    </form>
    </div>
  );
}
