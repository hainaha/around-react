import { useState, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [url, setUrl] = useState("");
  const avatarRef = useRef();

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Alterar a foto do perfil"}
      name={"edit-avatar"}
      textButton={"Salvar"}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        placeholder="Link da imagem"
        className="popup__input"
        id="avatar-image"
        value={url}
        onChange={handleUrlChange}
        ref={avatarRef}
        required
      />
      <span className="popup__error avatar-image-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
