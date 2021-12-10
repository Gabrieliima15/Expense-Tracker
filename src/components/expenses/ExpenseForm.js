import classes from "./ExpenseForm.module.css";
import Card from "../UI/Card";
import { useState, Fragment } from "react";
import ErrorModal from "./ErrorModal";

const ExpenseForm = (props) => {
  const [formIsShown, setFormIsShown] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const onClose = () => {
    setFormIsValid(true);
  };

  const titleHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const priceHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const dateHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      enteredTitle.trim().length === 0 ||
      enteredPrice.trim().length === 0 ||
      enteredDate.trim().length === 0
    ) {
      setFormIsValid(false);
      return;
    }

    const expenseData = {
      id: Math.random().toString(),
      title: enteredTitle,
      price: +enteredPrice,
      date: new Date(enteredDate.replace(/-/g, "/")),
    };

    props.onNewExpense(expenseData);

    setEnteredTitle("");
    setEnteredPrice("");
    setEnteredDate("");
  };

  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  return (
    <Fragment>
      {!formIsValid && <ErrorModal onClick={onClose} />}
      <Card className={classes["form-wrapper"]}>
        {formIsShown && (
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.action}>
              <div className={classes.fields}>
                <label>Title</label>
                <input
                  type="text"
                  value={enteredTitle}
                  onChange={titleHandler}
                ></input>
              </div>
              <div className={classes.fields}>
                <label>Price</label>
                <input
                  onChange={priceHandler}
                  value={enteredPrice}
                  type="number"
                  min="0"
                  step="0.01"
                ></input>
              </div>
              <div className={classes.fields}>
                <label>Date</label>
                <input
                  onChange={dateHandler}
                  value={enteredDate}
                  type="date"
                ></input>
              </div>
            </div>
            <div className={classes.buttons}>
              <button onClick={hideFormHandler}>Cancel</button>
              <button>Add Expense</button>
            </div>
          </form>
        )}
        {!formIsShown && (
          <button onClick={showFormHandler}>Add New Expense</button>
        )}
      </Card>
    </Fragment>
  );
};

export default ExpenseForm;
