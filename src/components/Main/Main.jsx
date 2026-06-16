import { useState, useEffect, useContext } from "react";
import api from "../../utils/api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/NewCard/NewCard.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/EditAvatar/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";

export default function Main() {
  const currentUser = useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error("Error al cargar las tarjetas:", err);
      });
  }, []);

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    try {
      const newCard = await api.toggleLike(card._id, !isLiked);

      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard,
        ),
      );
    } catch (error) {
      console.error("Error al dar/quitar like:", error);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);

      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id),
      );
    } catch (error) {
      console.error("Error al eliminar tarjeta:", error);
    }
  }

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="content">
      {/* PROFILE SECTION */}
      <section className="profile page__section">
        <div className="profile__image-container" id="avatar-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt={`Avatar de ${currentUser.name}`}
          />
          <button
            type="button"
            className="profile__edit-avatar"
            aria-label="Editar avatar"
            id="edit-avatar-button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      {/* CARDS SECTION */}
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>

      {/* POPUP */}
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
