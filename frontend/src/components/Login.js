import React from "react";

export default function Login({ handleLogin }) {
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
    let { password, email } = data;
    handleLogin(password, email);
  };

  return (
    <div className="sign-form">
      <h1 className="sign-form__header">Вход</h1>
      <form action="#" onSubmit={handleSubmit}>
        <input
          className="sign-form__input"
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        ></input>
        <input
          className="sign-form__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={data.password}
          onChange={handleChange}
          required
        ></input>
        <button type="submit" className="sign-form__button">
          Войти
        </button>
      </form>
    </div>
  );
}
