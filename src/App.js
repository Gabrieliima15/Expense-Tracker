import ExpenseList from "./components/expenses/ExpenseList";
import Card from "./components/UI/Card";
import classes from "./App.module.css";
import ExpenseForm from "./components/expenses/ExpenseForm";
import ExpenseFilter from "./components/expenses/ExpenseFilter";
import { Fragment, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filteredYear, setFilteredYear] = useState("");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
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
