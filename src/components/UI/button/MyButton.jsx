import classes from "./MyButton.module.css";

export default function MyButton({ children, isActive = false, ...props }) {
  return (
    <button
      className={`${classes.myBtn} ${isActive ? classes.myBtn_IsActive : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
