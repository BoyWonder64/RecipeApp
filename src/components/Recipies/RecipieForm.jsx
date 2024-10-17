import useInput from "../../hooks/useInput";
import classes from "./RecipieForm.module.css";
import foodIcon1 from "../../assets/foodicon1.png";
import foodIcon2 from "../../assets/foodicon2.png";
import foodIcon3 from "../../assets/foodicon3.png";

const RecipieForm = (props) => {
  const {
    value: enteredRecipieName,
    isValid: enteredRecipieNameIsValid,
    hasError: recipieNameInputHasError,
    valueChangeHandler: recipieNameChangedHandler,
    inputBlurHandler: recipieNameBlurHandler,
    reset: resetRecipieNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredIngredients,
    isValid: enteredIngredientsIsValid,
    hasError: ingredientsInputHasError,
    valueChangeHandler: ingredientsChangedHandler,
    inputBlurHandler: ingredientsBlurHandler,
    reset: resetIngredientsInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredInstructions,
    isValid: enteredInstructionsIsValid,
    hasError: instructionsInputHasError,
    valueChangeHandler: instructionsChangeHandler,
    inputBlurHandler: instructionsBlurHandler,
    reset: resetInstructionsInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    enteredRecipieNameIsValid &&
    enteredIngredientsIsValid &&
    enteredInstructionsIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const recipeData = {
      name: enteredRecipieName,
      ingredients: enteredIngredients,
      steps: enteredInstructions,
    };

    try {
      await fetch(
        "https://meal-app-e1b9b-default-rtdb.firebaseio.com/recipes.json",
        {
          method: "POST",
          body: JSON.stringify(recipeData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //https://www.altcademy.com/blog/how-to-refresh-the-page-in-reactjs/ Force reload the page to display the latest values from the DB
      window.location.reload();
    } catch (error) {
      console.error("Error saving recipe:", error);
    }

    resetRecipieNameInput();
    resetIngredientsInput();
    resetInstructionsInput();
  };

  const recipieNameInputClasses = recipieNameInputHasError
    ? "form-control invalid"
    : "form-control";

  const recipieIngredientsInputClasses = ingredientsInputHasError
    ? "form-control invalid"
    : "form-control";

  const instructionsInputClasses = instructionsInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form className={classes.form} onSubmit={formSubmissionHandler}>
      <h2>Give me your delicous recipes!</h2>
      <div className={recipieNameInputClasses}>
        <div className={`${classes["form-control"]}`}>
          <img
            src={foodIcon1}
            alt="Recipe Icon"
            className={classes["icon-image"]}
          />
          <label htmlFor="recipieName">Name:</label>
          <input
            type="text"
            id="recipieName"
            onChange={recipieNameChangedHandler}
            onBlur={recipieNameBlurHandler}
            value={enteredRecipieName}
          />
        </div>
        {recipieNameInputHasError && (
          <p className={classes["error-text"]}>
            Recipe name must not be empty!
          </p>
        )}
      </div>

      <div className={recipieIngredientsInputClasses}>
        <div className={`${classes["form-control"]}`}>
          <img
            src={foodIcon2}
            alt="Ingredients Icon"
            className={classes["icon-image"]}
          />
          <label htmlFor="ingredients">Ingredients:</label>
          <input
            type="text"
            id="ingredients"
            onChange={ingredientsChangedHandler}
            onBlur={ingredientsBlurHandler}
            value={enteredIngredients}
          />
        </div>
        {ingredientsInputHasError && (
          <p className={classes["error-text"]}>
            Ingredients must not be empty!
          </p>
        )}
      </div>

      <div className={instructionsInputClasses}>
        <div className={`${classes["form-control"]} `}>
          <img
            className={classes["icon-image"]}
            src={foodIcon3}
            alt="Instructions Icon"
          />
          <label htmlFor="instructions">Instructions:</label>
          <input
            type="text"
            id="instructions"
            onChange={instructionsChangeHandler}
            onBlur={instructionsBlurHandler}
            value={enteredInstructions}
          />
        </div>
        {instructionsInputHasError && (
          <p className={classes["error-text"]}>
            Instructions must not be empty!
          </p>
        )}
      </div>

      <div className="form-actions">
        <button className={classes.button}>Add Recipe</button>
      </div>
    </form>
  );
};

export default RecipieForm;
