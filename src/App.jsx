import { useState } from "react";
import RecipieForm from "./components/Recipies/RecipieForm"
import AvailableRecipies from "./components/Recipies/AvailableRecipies";

function App() {

  return (
    <>
      <RecipieForm />
      <AvailableRecipies />
    </>
  );
}

export default App;
