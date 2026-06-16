import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext.js";

export default function EditAvatar() {
  const { onUpdateAvatar } = useContext(CurrentUserContext);

  const avatarInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_avatar"
          id="avatar-url"
          name="userAvatar"
          placeholder="URL de la imagen"
          required
          type="url"
          ref={avatarInputRef}
        />
        <span className="popup__error" id="avatar-url-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
