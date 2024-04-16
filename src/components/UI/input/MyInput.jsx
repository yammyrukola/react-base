import classes from "./MyInput.module.css";

export default function MyInput(props) {
  return <input className={classes.myInput} {...props}></input>;
}
