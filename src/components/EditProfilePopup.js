import { useState, useContext, useEffect } from "react";
import { CreateUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = useContext(CreateUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      //setIsOpen={props.onEditProfileClick}
      onClose={props.onClose}
      title={"Editar perfil"}
      name={"edit-profile"}
      textButton={"Salvar"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Nome"
        className="popup__input"
        id="input-name"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error input-name-error"></span>
      <input
        type="text"
        name="about"
        placeholder="Sobre mim"
        className="popup__input"
        id="input-about"
        required
        minLength="2"
        maxLength="200"
        value={about}
        onChange={handleAboutChange}
      />
      <span className="popup__error input-about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
