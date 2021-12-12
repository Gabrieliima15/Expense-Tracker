import classes from "./ErrorModal.module.css";
import Modal from "../UI/Modal";

const ErrorModal = (props) => {
  return (
    <Modal className={classes.error} onClose={props.onClick}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.message}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <button onClick={props.onClick} className={classes.button}>
          Okay
        </button>
      </footer>
    </Modal>
  );
};

export default ErrorModal;
