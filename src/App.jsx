
import RecipieForm from "./components/Recipies/RecipieForm"
import AvailableRecipies from "./components/Recipies/AvailableRecipies";
import Header from "./components/Layout/Header";

function App() {

  return (
    <>
      <Header/>
      <RecipieForm />
      <AvailableRecipies />
    </>
  );
}

export default App;
