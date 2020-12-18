import React from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import { api } from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ArrCards from "../contexts/CardsContext.js";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { register, authorize, getContent } from "../auth.js";
import InfoTooltipPopup from "./InfoTooltipPopup.js";
require('dotenv').config;

function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));

          setNewCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));

          setNewCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => {
          return c._id !== card._id;
        });
        setNewCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setNewAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .postNewCard({ name, link })
      .then((newCard) => {
        console.log(newCard)
        setNewCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //--------------------- РАБОТА 14 ----------------//

  const [loggedIn, setLogged] = React.useState(false);
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          if (res) {
            setUserData({
              email: res.email,
            });
            setLogged(true);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLogin = (password, email) => {
    authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setUserData({
            password: data.password,
            email: data.email,
          });
          setLogged(true);
          history.push("/");
        }
      })
      .catch((err) => {
        handleInfoTooltip();
        setResult(false);
        console.log(err)});
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUserData({
      email: "",
      password: "",
    });
    setLogged(false);
  };

  const [result, setResult] = React.useState();

  const handleRegister = (password, email) => {
    register(password, email)
      .then((data) => {
        setUserData({
          email: data.email,
          password: data.password,
        });
        setLogged(true);
        history.push("/");
        setResult(true);
        handleInfoTooltip();
      })
      .catch((err) => {
        handleInfoTooltip();
        setResult(false);
        console.log(err);
      });
  };

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
  }, []);

  //--------------------- КАРТОЧКИ ----------------//

  const [cards, setNewCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setNewCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <ArrCards.Provider value={cards}>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            title="Вы уверены?"
            name="card-delete"
            buttonText="Да"
          ></PopupWithForm>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltipPopup
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            req={result}
          />

          <Header userData={userData} handleLogout={handleLogout} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onLikeClick={handleCardLike}
              onDeleteCard={handleDeleteCard}
            />
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} tokenCheck={tokenCheck} />
            </Route>
            <Route path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
        </ArrCards.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
