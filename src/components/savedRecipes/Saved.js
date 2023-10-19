import React, { useState, useEffect, useContext } from "react";
import Notification from "../UI/Notification";
import SavedCardList from "./SavedCards/SavedCardList";
import { supabase } from "../../utils/supabase";
import UserContext from "../../store/user-context";

const Saved = (props) => {
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);

  const savedRecipesLocalStorage = JSON.parse(
    localStorage.getItem("savedRecipes")
  );
  const [savedRecipes, setSavedRecipes] = useState([]);

  const getSignedInState = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data.session !== null) {
      setUserIsSignedIn(true);
    }
  };
  const userCtx = useContext(UserContext);

  useEffect(() => {
    userCtx.setActiveTab("saved");
    getSignedInState();
    getSavedRecipes();
  }, [userIsSignedIn, savedRecipes]);

  async function getSavedRecipes() {
    if (userIsSignedIn) {
      const { data, error } = await supabase.from("saved").select();
      //QUESTION: useEffect will run in an infite loop without this if statement, because my state is continually replaced with 'data' and array that is idential to the current state. is there a better way to prevent state from being updated with an identical new state?
      if (JSON.stringify(data) !== JSON.stringify(savedRecipes)) {
        setSavedRecipes(data);
      }

      console.log("user is logged in");
    } else {
      //QUESTION: my useEffect is currently run 4 times in succession, is there a way to limit this to only once?
      console.log("not logged in");
      const { data, error } = await supabase
        .from("recipes")
        .select()
        .in("id", savedRecipesLocalStorage);
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
        {userIsSignedIn === false && (
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
