import RecipeInputContainer from "./RecipeInputContainer";
import PresetList from "./Presets/PresetList";
import SavedCardList from "../savedRecipes/SavedCards/SavedCardList";
import React,{useState,useEffect} from "react";
import { createClient } from "@supabase/supabase-js";
const HomeScreen = (props) => {

    const [savedRecipes,setSavedRecipes] = useState([]);
const supabase = createClient(
    "https://xrduaykrzrmjuueaxmul.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZHVheWtyenJtanV1ZWF4bXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMjA2MjUsImV4cCI6MjAxMjY5NjYyNX0.Hfms-KUZhwsONOUO5YVyskGQ2m9T9ZzZkm-e9jjWE0I"
  );
    
  async function getRecipes() {
   
      const { data, error } = await supabase
        .from("recipes")
        .select()
        
      setSavedRecipes(data);
    }
  
    useEffect(() => {
        getRecipes()
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
