import { useState, useEffect } from "react";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    console.log("🔄 Iniciando carga inicial...");
    setIsLoading(true);

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        console.log("✅ Usuario cargado:", userData);
        console.log("✅ Tarjetas cargadas:", cardsData);

        setCurrentUser(userData);

        if (Array.isArray(cardsData)) {
          setCards(cardsData);
        } else {
          console.warn("Las tarjetas no son un array:", cardsData);
          setCards([]);
        }
      })
      .catch((err) => {
        console.error("❌ Error al cargar datos iniciales:", err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("✅ Carga completada, isLoading = false");
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
    return api
      .addNewCard(cardData.name, cardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => console.error("Error al agregar tarjeta:", err));
  }

  function handleUpdateUser(data) {
    console.log("📤 Enviando a la API:", data);
    return api
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
    return api
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
          isLoading={isLoading}
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
