import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [imageLink, setImageLink] = useState("");

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handleImageLinkChange(e) {
    setImageLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({ placeName, imageLink });
    setPlaceName("");
    setImageLink("");
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Novo local"}
      name={"addCard"}
      textButton={"Salvar"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Titulo"
        className="popup__input"
        id="card-title"
        required
        minLength="2"
        maxLength="30"
        value={placeName}
        onChange={handlePlaceNameChange}
      />
      <span className="popup__error card-title-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Link da imagem"
        className="popup__input"
        id="card-image"
        value={imageLink}
        onChange={handleImageLinkChange}
        required
      />
      <span className="popup__error card-image-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
