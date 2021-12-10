import classes from "./Expense.module.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

const Expense = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li>
      <Card className={classes.expense}>
        <ExpenseDate date={props.date} />
        <div className={classes.info}>
          <h2>{props.title}</h2>
          <div className={classes.price}>{price}</div>
        </div>
      </Card>
    </li>
  );
};

export default Expense;
