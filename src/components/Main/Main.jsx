import { useState } from "react";
import avatar from "../../images/avatar.jpg";

// Importar componentes de popup
import Popup from "./components/Popup/Popup.jsx";
import NewCard from "./components/NewCard/NewCard.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/EditAvatar/EditAvatar.jsx";

export default function Main() {
  // Estado para controlar qué popup está abierto
  const [popup, setPopup] = useState(null);

  // Definir los popups disponibles
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

  // Función para abrir popup
  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  // Función para cerrar popup
  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="content">
      {/* PROFILE SECTION */}
      <section className="profile page__section">
        <div className="profile__image-container" id="avatar-container">
          <img className="profile__image" src={avatar} alt="Avatar" />
          <button
            type="button"
            className="profile__edit-avatar"
            aria-label="Editar avatar"
            id="edit-avatar-button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">Explorador</p>
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
          {/* Las tarjetas se renderizarán dinámicamente con React */}
        </ul>
      </section>

      {/* POPUP - Renderizado condicional */}
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
