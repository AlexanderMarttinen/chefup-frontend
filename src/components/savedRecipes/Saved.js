import React, { useState, useEffect, useContext } from "react";
import Notification from "../UI/Notification";
import SavedCardList from "./SavedCards/SavedCardList";
import { supabase } from "../../utils/supabase";
import UserContext from "../../store/user-context";

const Saved = (props) => {
  
  let savedRecipesLocalStorage = JSON.parse(
    localStorage.getItem("savedRecipes")
  ); 
  if (savedRecipesLocalStorage ===null){
    savedRecipesLocalStorage =[]
  }
  const [localStorageSavedRecipes, setLocalStorageSavedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  
    
  const userCtx = useContext(UserContext);

  useEffect(() => {
    getSavedRecipes();
  }, [savedRecipes, getSavedRecipes]);

  async function getSavedRecipes() {
    if (userCtx.signedIn !== null) {
      const { data, error } = await supabase.from("saved").select();
      if(error){
        console.log("error", error)
      }
      //QUESTION: useEffect will run in an infite loop without this if statement, because my state is continually replaced with 'data' and array that is idential to the current state. is there a better way to prevent state from being updated with an identical new state?
      if (JSON.stringify(data) !== JSON.stringify(savedRecipes)) {
        setSavedRecipes(data);
      }
      if(error!==null){
        alert(error)
      }
    } else {
      const { data, error } = await supabase
        .from("recipes")
        .select()
        .in("id", localStorageSavedRecipes);
      if (error !== null) {
        alert(error);
      }
      if (JSON.stringify(data) !== JSON.stringify(savedRecipes)) {
        setSavedRecipes(data);
      }
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="h1-title" style={{ textAlign: "left" }}>
          Saved Recipes
        </h1>
        {userCtx.signedIn === null  && (
          <Notification
            buttonText="Sign in"
            text="Sign into your account to access saved recipes across different devices."
          />
        )}
        <SavedCardList recipes={savedRecipes} />
      </div>
    </>
  );
};

export default Saved;
