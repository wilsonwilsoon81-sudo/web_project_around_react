import { useState, useEffect } from "react";
import api from "./utils/api.js";
import CurrentUserContext from "./contexts/CurrentUserContext.js";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Jacques Cousteau",
    about: "Explorador",
    avatar:
      "https://myhero.com/content/images/thumbs/0124822_jacques-cousteau.jpeg",
    _id: "",
  });

  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        console.log("✅ Datos del usuario cargados:", data);
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error("❌ Error al cargar el usuario:", err);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        if (Array.isArray(data)) {
          setCards(data);
        } else {
          console.warn("La API no devolvió un array:", data);
          setCards([]);
        }
      })
      .catch((err) => {
        console.error("Error al cargar las tarjetas:", err);
        setCards([]);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.isLiked;
    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((err) => console.error("Error al dar/quitar like:", err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((err) => console.error("Error al eliminar tarjeta:", err));
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addNewCard(cardData.name, cardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => console.error("Error al agregar tarjeta:", err));
  }

  function handleUpdateUser(data) {
    api
      .updateUserInfo(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => {
        console.error("❌ Error al actualizar el usuario:", err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateUserAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => {
        console.error("❌ Error al actualizar el avatar:", err);
      });
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          onUpdateAvatar: handleUpdateAvatar,
        }}
      >
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlace={handleAddPlaceSubmit}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
