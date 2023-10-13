import React, { useState, useEffect } from "react";
import NavBar from "../UI/NavBar";

import Notification from "../UI/Notification";
import SavedCardList from "./SavedCards/SavedCardList";
import { createClient } from "@supabase/supabase-js";

const Saved = (props) => {
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);

  const savedRecipesLocalStorage = JSON.parse(
    localStorage.getItem("savedRecipes")
  );
  const [savedRecipes, setSavedRecipes] = useState([]);
  const supabase = createClient(
    "https://xrduaykrzrmjuueaxmul.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZHVheWtyenJtanV1ZWF4bXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMjA2MjUsImV4cCI6MjAxMjY5NjYyNX0.Hfms-KUZhwsONOUO5YVyskGQ2m9T9ZzZkm-e9jjWE0I"
  );

  const getSignedInState = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data.session !== null) {
      setUserIsSignedIn(true);
    }
  };

  useEffect(() => {
   
    getSignedInState();
    getSavedRecipes();
  }, [userIsSignedIn,savedRecipes]);

  async function getSavedRecipes() {
    if (userIsSignedIn) {
        const { data, error } = await supabase
        .from("saved")
        .select()
        if (JSON.stringify(data) !== JSON.stringify(savedRecipes)){
            setSavedRecipes(data);
        }
       
        console.log("user is logged in")
    } else {
        console.log("not logged in")
      const { data, error } = await supabase
        .from("recipes")
        .select()
        .in("id", savedRecipesLocalStorage);
      setSavedRecipes(data);
    }
  }
  

  return (
    <>
      <NavBar active="saved" userSignedIn={userIsSignedIn} />
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
