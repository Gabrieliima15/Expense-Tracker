import classes from "./ExpenseForm.module.css";
import Card from "../UI/Card";
import { useState, Fragment } from "react";
import useInput from "../../hooks/use-input";

const ExpenseForm = (props) => {
  const [formIsShown, setFormIsShown] = useState(false);

  const {
    value: enteredTitle,
    hasError: titleHasError,
    valueChangeHandler: titleHandler,
    inputBlurHandler: titleBlurHandler,
    valueIsValid: titleIsValid,
    reset: resetTitle,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPrice,
    hasError: priceHasError,
    valueChangeHandler: priceHandler,
    inputBlurHandler: priceBlurHandler,
    valueIsValid: priceIsValid,
    reset: resetPrice,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDate,
    hasError: dateHasError,
    valueChangeHandler: dateHandler,
    inputBlurHandler: dateBlurHandler,
    valueIsValid: dateIsValid,
    reset: resetDate,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (titleIsValid && priceIsValid && dateIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      id: Math.random().toString(),
      title: enteredTitle,
      price: +enteredPrice,
      date: new Date(enteredDate.replace(/-/g, "/")),
    };

    props.onNewExpense(expenseData);

    resetTitle();
    resetPrice();
    resetDate();
  };

  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const hideFormHandler = () => {
    setFormIsShown(false);
  };

  return (
    <Fragment>
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
                {titleHasError && (
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
                {priceHasError && (
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
                {dateHasError && (
                  <p className={classes.invalid}>Date must not be empty.</p>
                )}
              </div>
            </div>
            <div className={classes.buttons}>
              <button onClick={hideFormHandler}>Cancel</button>
              <button disabled={!formIsValid} className={classes.submit}>
                Add Expense
              </button>
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
