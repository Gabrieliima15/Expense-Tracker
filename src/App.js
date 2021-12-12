import ExpenseList from "./components/expenses/ExpenseList";
import Card from "./components/UI/Card";
import classes from "./App.module.css";
import ExpenseForm from "./components/expenses/ExpenseForm";
import ExpenseFilter from "./components/expenses/ExpenseFilter";
import ErrorModal from "./components/expenses/ErrorModal";
import { Fragment, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filteredYear, setFilteredYear] = useState("");
  const [filterIsValid, setFilterIsValid] = useState(true);

  const filterChangeHandler = (selectedYear) => {
    if (selectedYear < 2000 || selectedYear > 2022) {
      setFilterIsValid(false);
      return;
    }
    setFilteredYear(selectedYear);
  };

  const onClose = () => {
    setFilterIsValid(true);
  };

  const filteredExpenses = expenses.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  const newExpenseHandler = (expenseData) => {
    setExpenses((prevExpenses) => {
      return [expenseData, ...prevExpenses].sort((a, b) => b.date - a.date);
    });
  };

  return (
    <Fragment>
      {!filterIsValid && (
        <ErrorModal
          onClick={onClose}
          title="Invalid Input"
          message="Insert a year between 2000 and 2022!"
        />
      )}
      <ExpenseForm onNewExpense={newExpenseHandler} />
      <Card className={classes.container}>
        <ExpenseFilter selected={filteredYear} onChange={filterChangeHandler} />
        {filteredExpenses.length === 0 && (
          <p className={classes.message}>{`No expenses found${
            filteredYear !== "" ? ` in ${filteredYear}` : ""
          }.`}</p>
        )}
        <ExpenseList expenses={filteredExpenses} />
      </Card>
    </Fragment>
  );
}

export default App;
