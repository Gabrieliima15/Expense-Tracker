import Expense from "./Expense";
import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  return (
    <ul className={classes.expenses}>
      {props.expenses.map((expense) => (
        <Expense
          key={expense.id}
          id={expense.id}
          title={expense.title}
          price={expense.price}
          date={expense.date}
        />
      ))}
    </ul>
  );
};

export default ExpenseList;
