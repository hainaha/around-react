import { useState, useEffect } from "react";
import { api } from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CreateUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserData().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about }).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(url) {
    api.setUserAvatar(url).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit({ placeName, imageLink }) {
    api.addCard({ name: placeName, link: imageLink }).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.keyCode === 27) {
        closeAllPopups();
      }
    };
    window.addEventListener("keydown", handleEscClose);

    return () => window.removeEventListener("keydown", handleEscClose);
  }, []);

  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (
        !evt.target.closest(".popup__container") &&
        evt.target.tagName !== "IMG" &&
        evt.target.tagName !== "BUTTON"
      ) {
        closeAllPopups();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    api.getInitialCards().then((initialCards) => {
      setCards(initialCards);
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((deletedCard) => {
      setCards((state) => state.filter((c) => c._id !== deletedCard));
    });
  }

  return (
    <CreateUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          onEditProfileClick={handleEditProfileClick}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          onAddPlaceClick={handleAddPlaceClick}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          onEditAvatarClick={handleEditAvatarClick}
          isDeleteCardPopupOpen={isDeleteCardPopupOpen}
          onDeleteClick={handleDeleteCardClick}
          onCardClick={handleCardClick}
          onClose={closeAllPopups}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        ></Main>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CreateUserContext.Provider>
  );
}

export default App;
