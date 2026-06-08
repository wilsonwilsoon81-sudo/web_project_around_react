import avatar from "../../images/avatar.jpg";

function Main() {
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
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
          ></button>
          <p className="profile__description">Explorador</p>
        </div>

        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
        ></button>
      </section>

      {/* CARDS SECTION */}
      <section className="cards page__section">
        <ul className="cards__list">
          {/* Las tarjetas se renderizarán dinámicamente con React */}
        </ul>
      </section>
    </main>
  );
}

export default Main;
