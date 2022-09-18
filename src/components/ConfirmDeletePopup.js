import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteSubmit(props.card);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Tem certeza?"}
      name={"deleteCard"}
      textButton={"Sim"}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;
