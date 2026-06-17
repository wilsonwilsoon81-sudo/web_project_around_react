import { useState } from "react";

export default function NewCard({ onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    onAddPlace({ name, link }).finally(() => {
      setIsSubmitting(false);
      setName("");
      setLink("");
    });
  }

  return (
    <form
      className="popup__form"
      name="new-place-form"
      id="new-place-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="place-name"
          maxLength="30"
          minLength="2"
          name="name"
          placeholder="Nombre del lugar"
          required
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="place-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_url"
          id="place-link"
          name="link"
          placeholder="Enlace a la imagen"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__error" id="place-link-error"></span>
      </label>
      <button
        className="button popup__button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
