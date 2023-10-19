import React, { useState, useEffect, Fragment } from "react";
import classes from "./ScreenRecipe.module.css";
import Card from "../UI/Card/Card";
import IngredientList from "./ingredients/IngredientList";
import StepList from "./steps/StepList";
import ImgSaved from "../../assets/icons/icon-saved.png";
import ImgSavedFilled from "../../assets/icons/icon-saved-filled.png";
import ImgDownIcon from "../../assets/icons/chevron-down.png";
import ImgUpIcon from "../../assets/icons/chevron-up.png";
import { useParams } from "react-router-dom";
import { supabase } from "../../utils/supabase";

const ScreenRecipe = (props) => {
  // TODO, fetch the recipe details from supabase based on the URL
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading,setIsLoading ] = useState(true);
  const [servesAmountMultiplier, setServesAmountMultiplier] = useState(null);
  const [servesAmount, setServesAmount] = useState(null);
  const [savedIsHighlighted, setSavedIsHighlighted] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [useInfo, setUserInfo] = useState({});
  const [recipeIsSaved, setRecipeIsSaved] = useState(false);
  
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);


  const URLParameters = useParams();
  
  useEffect(() => {
    const savedRecipesStorage = localStorage.getItem("savedRecipes");
    if (recipeData === null) {
      getRecipe();
    }
    getSignedInState();
    if (savedRecipesStorage === null) {
      localStorage.setItem("savedRecipes", "[]");
    }
    if(recipeData!=null){
      getSavedState();
      setServesAmountMultiplier(servesAmount / recipeData.serves);
    }
  }, [recipeData, savedRecipes,servesAmount]);

  const getSignedInState = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data.session !== null) {
      setUserIsSignedIn(true);
      setUserInfo(data.session.user);
    }
  };
  const deleteFromSaved = async () => {
    const { error } = await supabase
      .from("saved")
      .delete()
      .eq("id", recipeData.id);
  };
  const addToSaved = async () => {
    const { error } = await supabase
      .from("saved")
      .insert({
        id: recipeData.id,
        user_id: useInfo.email,
        name: recipeData.name,
        description: recipeData.description,
      });
  };
  const handleSaveClick = () => {
    setRecipeIsSaved(!recipeIsSaved);
    if (userIsSignedIn) {
      if (recipeIsSaved) {
        deleteFromSaved();
      } else {
        addToSaved();
      }
    } else {
      let localStorageArray = [];
      localStorageArray = JSON.parse(localStorage.getItem("savedRecipes"));
      if (recipeIsSaved) {
        const index = localStorageArray.indexOf(recipeData.id);
        console.log(index);
        localStorageArray.splice(index, 1);
        localStorage.setItem("savedRecipes", JSON.stringify(localStorageArray));
      } else {
        localStorageArray.push(recipeData.id);
        localStorage.setItem("savedRecipes", JSON.stringify(localStorageArray));
      }
    }
    setSavedIsHighlighted(true);
    const timer = setTimeout(() => {
      setSavedIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  };

  async function getRecipe() {
    const { data, error } = await supabase
      .from("recipes")
      .select()
      .eq("id", `${URLParameters.id}`);
    setRecipeData(data[0]);
    setServesAmount(data[0].serves)
    setIsLoading(false);
  }

  async function getSavedState() {
    if (userIsSignedIn) {
      const { data, error } = await supabase.from("saved").select();
      if (JSON.stringify(data) !== JSON.stringify(savedRecipes)) {
        console.log("strings are not equal");
        setSavedRecipes(data);
      }

      if (savedRecipes.find((recipe) => recipe.id === recipeData.id)) {
        setRecipeIsSaved(true);
      }
    } else {
      const localStorageArray = JSON.parse(
        localStorage.getItem("savedRecipes")
      );
      if (parseInt(localStorageArray.indexOf(recipeData.id)) !== -1) {
        setRecipeIsSaved(true);
      }
    }
  }
  

  const handleUpClick = () => {
    setServesAmount(servesAmount + 1);
  };
  const handleDownClick = () => {
    setServesAmount(servesAmount - 1);
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading</p>;
    } else {
      return (
        <>
        <div className={classes.actionContainer}>
        <div style={{ width: `70%` }}>
          <h1 className="h1-title">{recipeData.name}</h1>
          <p>{recipeData.description}</p>
        </div>
        <button onClick={handleSaveClick} className={classes.btnYellowIcon}>
          <img src={recipeIsSaved ? ImgSavedFilled : ImgSaved} />
          {recipeIsSaved ? "Recipe Saved" : "Save Recipe"}
        </button>
      </div>

      <h2 className={classes.cardTitle}>Ingredients</h2>
      <Card>
        <div className={classes.ingredientsActionContainer}>
          <p>Serves:</p>
          <h3>{servesAmount}</h3>
          <button onClick={handleDownClick}>
            <img src={ImgDownIcon} width={12} />
          </button>
          <button onClick={handleUpClick}>
            <img src={ImgUpIcon} width={12} />
          </button>
        </div>
        <IngredientList
          ingredients={recipeData.ingredients}
          amountMultiplier={servesAmountMultiplier}
        />
      </Card>
      <div className={classes.CardTitleContainer}>
        <h2 className={classes.cardTitle}>Instructions</h2>
      
      </div>
      <Card>
        <StepList steps={recipeData.steps} />
      </Card>
      </>
        )
    }
  }

  return (
    <>
      <div className={classes.container}>
      {renderContent()}
        
      </div>
    </>
  );
};

export default ScreenRecipe;


