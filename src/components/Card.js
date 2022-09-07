function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <>
      <div className="card">
        <button
          className="card__delete-icon"
          type="submit"
          onClick={props.deletePopup}
        ></button>
        <img
          src={props.card.link}
          className="card__image"
          alt={props.card.name}
          onClick={handleClick}
        />
        <div className="card__title-container">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__like-container">
            <button className="like-button" type="button"></button>
            <p className="card__likes">{props.card.likes.length}</p>
            <p className="card__id">{props.card._id}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
