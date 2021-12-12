import { useState } from "react";
import classes from "./ExpenseFilter.module.css";
import SearchIcon from "./SearchIcon";

const ExpenseFilter = (props) => {
  const [enteredYear, setEnteredYear] = useState("");

  const dropdownChangeHandler = () => {
    props.onChange(enteredYear);
  };

  const yearHandler = (event) => {
    setEnteredYear(event.target.value);
  };

  return (
    <div className={classes.filter}>
      <div className={classes["filter-control"]}>
        <label>Filter by Year</label>
        <div className={classes.actions}>
          <input
            type="number"
            value={enteredYear}
            onChange={yearHandler}
            placeholder="Year"
            min="2000"
          ></input>
          <button onClick={dropdownChangeHandler}>
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilter;