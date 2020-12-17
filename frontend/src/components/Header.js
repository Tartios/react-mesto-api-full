import React from "react";
import { Route, Link } from "react-router-dom";

function Header({ userData, handleLogout }) {
  return (
    (
      <header className="header">
        <Route exact path="/">
          <p className='header__profile'>{userData.email}</p>
          <button className="header__logout-button" onClick={handleLogout}>
            Выйти
          </button>
        </Route>
        <Route path="/sign-in">
          <Link className="header__nav" to="/sign-up">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link className="header__nav" to="/sign-in">
            Войти
          </Link>
        </Route>
      </header>
    )
  );
}

export default Header;
