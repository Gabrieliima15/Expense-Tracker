import classes from "./ExpenseForm.module.css";
import Card from "../UI/Card";
import { useState, Fragment } from "react";
import ErrorModal from "./ErrorModal";

const ExpenseForm = (props) => {
  const [formIsShown, setFormIsShown] = useState(false);
  const [formIsValid, setFormIsValid] = useState(true);
  const [titleWasTouched, setTitleWasTouched] = useState(false);
  const [priceWasTouched, setPriceWasTouched] = useState(false);
  const [dateWasTouched, setDateWasTouched] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleIsValid = !(enteredTitle.trim().length === 0);
  const priceIsValid = !(enteredPrice.trim().length === 0);
  const dateIsValid = !(enteredDate.trim().length === 0);

  const onClose = () => {
    setFormIsValid(true);
  };

  const titleBlurHandler = () => {
    setTitleWasTouched(true);
  };

  const priceBlurHandler = () => {
    setPriceWasTouched(true);
  };

  const dateBlurHandler = () => {
    setDateWasTouched(true);
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

    if (!titleIsValid || !priceIsValid || !dateIsValid) {
      setFormIsValid(false);
      setTitleWasTouched(true);
      setPriceWasTouched(true);
      setDateWasTouched(true);
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
    setTitleWasTouched(false);
    setPriceWasTouched(false);
    setDateWasTouched(false);
  };

  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  return (
    <Fragment>
      {!formIsValid && (
        <ErrorModal
          onClick={onClose}
          title="Invalid Input"
          message="Please fill out all fields!"
        />
      )}
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
                  onBlur={titleBlurHandler}
                ></input>
                {titleWasTouched && !titleIsValid && (
                  <p className={classes.invalid}>Title must not be empty.</p>
                )}
              </div>
              <div className={classes.fields}>
                <label>Price</label>
                <input
                  onChange={priceHandler}
                  onBlur={priceBlurHandler}
                  value={enteredPrice}
                  type="number"
                  min="0"
                  step="0.01"
                ></input>
                {priceWasTouched && !priceIsValid && (
                  <p className={classes.invalid}>Price must not be empty.</p>
                )}
              </div>
              <div className={classes.fields}>
                <label>Date</label>
                <input
                  onChange={dateHandler}
                  onBlur={dateBlurHandler}
                  value={enteredDate}
                  type="date"
                ></input>
                {dateWasTouched && !dateIsValid && (
                  <p className={classes.invalid}>Date must not be empty.</p>
                )}
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
