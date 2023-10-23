import RecipeInputContainer from "./RecipeInputContainer";
import SavedCardList from "../savedRecipes/SavedCards/SavedCardList";
import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

const HomeScreen = (props) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  async function getRecipes() {
    const { data, error } = await supabase.from("recipes").select();
    setSavedRecipes(data);
  }
  useEffect(() => {
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
