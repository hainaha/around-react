import { useState, useEffect } from "react";
import { api } from "../utils/api";
import Card from "./Card";
import PopupWithForm from "./PopupWithForm";

function Main(props) {
  const [cards, setCards] = useState([]);
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    api.getUserData().then((data) => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
      setUserId(data._id);
    });
  }, []);

  useEffect(() => {
    api.getInitialCards().then((initialCards) => {
      setCards(initialCards);
    });
  }, []);

  return (
    <>
      <main>
        <div className="profile">
          <div className="profile__avatar-container">
            <img
              src={userAvatar}
              className="profile__avatar"
              alt="Foto do perfil"
            />
            <button
              className="avatar-button"
              type="button"
              onClick={props.onEditAvatarClick}
            ></button>
            <PopupWithForm
              isOpen={props.isEditAvatarPopupOpen}
              setIsOpen={props.onEditAvatarClick}
              onClose={props.onClose}
              title={"Alterar a foto do perfil"}
              name={"edit-avatar"}
              textButton={"Salvar"}
            >
              <input
                type="url"
                name="avatar"
                placeholder="Link da imagem"
                className="popup__input"
                id="avatar-image"
                required
              />
              <span className="popup__error avatar-image-error"></span>
            </PopupWithForm>
          </div>
          <div className="profile__title-container">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="edit-button"
              type="button"
              onClick={props.onEditProfileClick}
            ></button>
            <p className="profile__subtitle">{userDescription}</p>
            <p className="profile__id">{userId}</p>
            <PopupWithForm
              isOpen={props.isEditProfilePopupOpen}
              setIsOpen={props.onEditProfileClick}
              onClose={props.onClose}
              title={"Editar perfil"}
              name={"edit-profile"}
              textButton={"Salvar"}
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
              />
              <span className="popup__error input-about-error"></span>
            </PopupWithForm>
          </div>
          <button
            className="add-button"
            type="button"
            onClick={props.onAddPlaceClick}
          >
            +
          </button>
          <PopupWithForm
            isOpen={props.isAddPlacePopupOpen}
            setIsOpen={props.onAddPlaceClick}
            onClose={props.onClose}
            title={"Novo local"}
            name={"addCard"}
            textButton={"Salvar"}
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
            />
            <span className="popup__error card-title-error"></span>
            <input
              type="url"
              name="link"
              placeholder="Link da imagem"
              className="popup__input"
              id="card-image"
              required
            />
            <span className="popup__error card-image-error"></span>
          </PopupWithForm>
          <PopupWithForm
            isOpen={props.isDeleteCardPopupOpen}
            setIsOpen={props.onDeleteClick}
            onClose={props.onClose}
            title={"Tem certeza?"}
            name={"deleteCard"}
            textButton={"Sim"}
          ></PopupWithForm>
        </div>
        <section className="content">
          {cards.map((card) => (
            <>
              <Card
                card={card}
                key={card._id}
                deletePopup={props.onDeleteClick}
                onCardClick={props.onCardClick}
              />
            </>
          ))}
          ;
        </section>
      </main>
    </>
  );
}

export default Main;
