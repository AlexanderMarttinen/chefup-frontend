import React, { useState, useEffect,useContext } from "react";
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
import UserContext from "../../store/user-context";
const ScreenRecipe = () => {
  const userCtx = useContext(UserContext);
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [servesAmountMultiplier, setServesAmountMultiplier] = useState(null);
  const [servesAmount, setServesAmount] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipeIsSaved, setRecipeIsSaved] = useState(false);

  const URLParameters = useParams();

  useEffect(() => {
    const savedRecipesStorage = localStorage.getItem("savedRecipes");
    if (recipeData === null) {
      getRecipe();
    }
    if (savedRecipesStorage === null) {
      localStorage.setItem("savedRecipes", "[]");
    }
    if (recipeData != null) {
      getSavedState();
      setServesAmountMultiplier(servesAmount / recipeData.serves);
    }
  }, [recipeData, savedRecipes, servesAmount, getRecipe, getSavedState]);


  const deleteFromSaved = async () => {
    const { error } = await supabase
      .from("saved")
      .delete()
      .eq("id", recipeData.id);
    if (error !== null) {
      alert(error);
    }
  };
  const addToSaved = async () => {
    const { error } = await supabase.from("saved").insert({
      id: recipeData.id,
      user_id: userCtx.signedIn.email,
      name: recipeData.name,
      description: recipeData.description,
    });
    if (error !== null) {
      alert(error);
    }
  };
  const handleSaveClick = () => {
    setRecipeIsSaved(!recipeIsSaved);
    if (userCtx.signedIn !== null) {
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
  };

  async function getRecipe() {
    const { data, error } = await supabase
      .from("recipes")
      .select()
      .eq("id", `${URLParameters.id}`);
    setRecipeData(data[0]);
    setServesAmount(data[0].serves);
    setIsLoading(false);
    if (error !== null) {
      alert(error);
    }
  }

  async function getSavedState() {
    if (userCtx.signedIn !== null) {
      const { data, error } = await supabase.from("saved").select();
      if (JSON.stringify(data) !== JSON.stringify(savedRecipes)) {
        console.log("strings are not equal");
        setSavedRecipes(data);
      }
      if (error !== null) {
        alert(error);
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
              <img
                src={recipeIsSaved ? ImgSavedFilled : ImgSaved}
                alt={recipeIsSaved ? "recipe is saved" : "recipe is not saved"}
              />
              {recipeIsSaved ? "Recipe Saved" : "Save Recipe"}
            </button>
          </div>

          <h2 className={classes.cardTitle}>Ingredients</h2>
          <Card>
            <div className={classes.ingredientsActionContainer}>
              <p>Serves:</p>
              <h3>{servesAmount}</h3>
              <button onClick={handleDownClick}>
                <img src={ImgDownIcon} width={12} alt="down arrow" />
              </button>
              <button onClick={handleUpClick}>
                <img src={ImgUpIcon} width={12} alt="up arrow" />
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
      );
    }
  };

  return (
    <>
      <div className={classes.container}>{renderContent()}</div>
    </>
  );
};

export default ScreenRecipe;
