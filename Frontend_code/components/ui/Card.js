import classes from "./Card.module.css";

//creating Card component to have style model and render its children in the middle

function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
