import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/NewCard/NewCard.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/EditAvatar/EditAvatar.jsx";
import Card from "./components/Card/Card.jsx";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onAddPlace,
  onOpenPopup,
  onClosePopup,
  popup,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlace={onAddPlace} />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  return (
    <main className="content">
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
            onClick={() => onOpenPopup(editAvatarPopup)}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {Array.isArray(cards) &&
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onOpenPopup={onOpenPopup}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
