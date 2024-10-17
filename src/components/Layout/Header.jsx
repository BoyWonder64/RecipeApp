import recipeBanner from "../../assets/recipeBanner.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Recipes App</h1>
      </header>
    </>
  );
};

export default Header;
