import RecipeInputContainer from "./RecipeInputContainer";
import SavedCardList from "../savedRecipes/SavedCards/SavedCardList";
import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../../utils/supabase";
import UserContext from "../../store/user-context";

const HomeScreen = (props) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userCtx = useContext(UserContext);

 

  async function getRecipes() {
    const { data, error } = await supabase.from("recipes").select();

    setSavedRecipes(data);
  }

  useEffect(() => {
    userCtx.setActiveTab("home");

   
    console.log(userCtx)
    getRecipes();
  }, []);

  const pull_data = (data) => {
    props.pull_data(data);
  };

  return (
    <div className="home-container">
      <h1 className="h1-title">Get the recipes, not the life story</h1>
      <RecipeInputContainer handleRecipe={pull_data} />
      <h2>Or use a recipe already made by users</h2>
      <SavedCardList recipes={savedRecipes} />
    </div>
  );
};

export default HomeScreen;
