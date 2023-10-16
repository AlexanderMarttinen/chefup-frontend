import React, { useState, useEffect, Fragment } from "react";
import classes from "./ScreenRecipe.module.css";
import Card from "../UI/Card/Card";
import IngredientList from "./ingredients/IngredientList";
import StepList from "./steps/StepList";
import ImgSaved from "../../assets/icons/icon-saved.png";
import ImgSavedFilled from "../../assets/icons/icon-saved-filled.png";
import ImgArrow from "../../assets/icons/arrowLeft.png";
import ImgDownIcon from "../../assets/icons/chevron-down.png";
import ImgUpIcon from "../../assets/icons/chevron-up.png";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

import NavBar from "../UI/NavBar";
const supabase = createClient(
  "https://xrduaykrzrmjuueaxmul.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZHVheWtyenJtanV1ZWF4bXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMjA2MjUsImV4cCI6MjAxMjY5NjYyNX0.Hfms-KUZhwsONOUO5YVyskGQ2m9T9ZzZkm-e9jjWE0I"
);

const ScreenRecipe = (props) => {
  // TODO, fetch the recipe details from supabase based on the URL
  const URLParameters = useParams();
  // let serveAmountDifference = 1.5;

  const DUMMY_DATA = {
    name: "Dummy Title",
    description: "Dummy Description will go here",
    serves: 4,
    cooktime: 25,
    ingredients: [
      {
        name: "shrimp, peeled and deveined",
        amount: "12oz.",
      },
      {
        name: "angel hair pasta",
        amount: "8oz.",
      },
      {
        name: "olive oil, divided",
        amount: "2 Tbsp",
      },
      {
        name: "garlic, minced",
        amount: "2 cloves",
      },
      {
        name: "grape tomatoes",
        amount: "1 pint",
      },
      {
        name: "basil pesto",
        amount: "1/4 cup",
      },
      {
        name: "grated Parmesan",
        amount: "1 Tbsp",
      },
    ],
    steps: [
      {
        body: "If using frozen shrimp, thaw them by placing them in a colander and running cool water over top. Peel the shrimp and remove the tails. Pat the shrimp dry with a paper towel.",
      },
      {
        body: "Bring a large pot of water to a boil for the pasta. Add the pasta and boil until tender (about seven minutes). Reserve about ½ cup of the starchy pasta water before draining the pasta in a colander.",
      },
      {
        body: "While the pasta is cooking, heat 1 tbsp olive oil in a large skillet. Once hot, add the prepared shrimp and sauté until the shrimp turns pink and opaque (2-3 minutes). Remove the cooked shrimp to a clean bowl.",
      },
      {
        body: "Add another tablespoon of olive oil to the skillet and add the grape tomatoes and minced garlic. Sauté until the tomatoes begin to burst and release their juices. If the garlic begins to brown before the tomatoes have burst, add a couple tablespoons of water to the skillet to slow the browning.",
      },
      {
        body: "Once the tomatoes have broken down in the skillet, add the cooked and drained pasta, ¼ cup pesto, and about half of the reserved pasta water.",
      },
    ],
  };

  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "Dummy Description will go here",
    serves: 4,
    cooktime: 25,
    ingredients: [
      {
        name: "shrimp, peeled and deveined",
        amount: "12oz.",
      },
      {
        name: "angel hair pasta",
        amount: "8oz.",
      },
      {
        name: "olive oil, divided",
        amount: "2 Tbsp",
      },
      {
        name: "garlic, minced",
        amount: "2 cloves",
      },
      {
        name: "grape tomatoes",
        amount: "1 pint",
      },
      {
        name: "basil pesto",
        amount: "1/4 cup",
      },
      {
        name: "grated Parmesan",
        amount: "1 Tbsp",
      },
    ],
    steps: [
      {
        body: "If using frozen shrimp, thaw them by placing them in a colander and running cool water over top. Peel the shrimp and remove the tails. Pat the shrimp dry with a paper towel.",
      },
      {
        body: "Bring a large pot of water to a boil for the pasta. Add the pasta and boil until tender (about seven minutes). Reserve about ½ cup of the starchy pasta water before draining the pasta in a colander.",
      },
      {
        body: "While the pasta is cooking, heat 1 tbsp olive oil in a large skillet. Once hot, add the prepared shrimp and sauté until the shrimp turns pink and opaque (2-3 minutes). Remove the cooked shrimp to a clean bowl.",
      },
      {
        body: "Add another tablespoon of olive oil to the skillet and add the grape tomatoes and minced garlic. Sauté until the tomatoes begin to burst and release their juices. If the garlic begins to brown before the tomatoes have burst, add a couple tablespoons of water to the skillet to slow the browning.",
      },
      {
        body: "Once the tomatoes have broken down in the skillet, add the cooked and drained pasta, ¼ cup pesto, and about half of the reserved pasta water.",
      },
    ],
  });

  let [servesAmount, setServesAmount] = useState(parseInt(recipeData.serves));
  const [savedIsHighlighted, setSavedIsHighlighted] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [useInfo, setUserInfo] = useState({});
  const [recipeIsSaved, setRecipeIsSaved] = useState(false);
  const savedClasses = ` ${savedIsHighlighted ? "bump" : ""}`;
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);

  let [servesAmountMultiplier, setServesAmountMultiplier] = useState(
    parseInt(recipeData.serves)
  );

  const getSignedInState = async () => {
    console.log("checking logged in");
    const { data, error } = await supabase.auth.getSession();
    if (data.session !== null) {
      setUserIsSignedIn(true);
      setUserInfo(data.session.user);
    }
  };
  const fetchRecipes = async () => {
    const { data, error } = await supabase.from("saved").select();
    if (JSON.stringify(data) !== JSON.stringify(savedRecipes)) {
      console.log("strings are not equal");
      setSavedRecipes(data);
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
    setSavedIsHighlighted(true);
    if (userIsSignedIn) {
      if (recipeIsSaved) {
        //REMOVE THE RECIPE FROM THE SAVED RECIPE SUPABASE TABLE
        deleteFromSaved();
      } else {
        //ADD THE RECIPE TO SAVED RECIPE SUPABASE TABLE
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

    setRecipeIsSaved(!recipeIsSaved);

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
  }

  function getSavedState() {
    if (userIsSignedIn) {
      fetchRecipes();
      console.log(recipeData.id);
      console.log(savedRecipes);
      if (savedRecipes.find((recipe) => recipe.id === recipeData.id)) {
        setRecipeIsSaved(true);
      }
    } else {
      const localStorageArray = JSON.parse(
        localStorage.getItem("savedRecipes")
      );

      console.log(localStorageArray.indexOf(recipeData.id));
      if (parseInt(localStorageArray.indexOf(recipeData.id)) !== -1) {
        setRecipeIsSaved(true);
      }
    }
  }

  useEffect(() => {
    const savedRecipesStorage = localStorage.getItem("savedRecipes");
    if (recipeData.name === "") {
      getRecipe();
    }
    getSignedInState();
    getSavedState();
    if (savedRecipesStorage === null) {
      localStorage.setItem("savedRecipes", "[]");
    }

    setServesAmountMultiplier(servesAmount / recipeData.serves);
  }, [recipeData, savedRecipes,servesAmount]);

  const handleUpClick = () => {
    setServesAmount(servesAmount + 1);
  };
  const handleDownClick = () => {
    setServesAmount(servesAmount - 1);
  };

  return (
    <>
      <NavBar savedClassesProps={savedClasses} userSignedIn={userIsSignedIn} />
      <div className={classes.container}>
        <div className={classes.actionContainer}>
          {/* <button onClick={handleBackClick} className={classes.btnSecondaryIcon}>
          <img src={ImgArrow} />
          Go Back
        </button> */}
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
          {/* <button onClick={handleBackClick} className={classes.btnSecondaryIcon}>
          <img src={ImgArrow} />
          Change Recipe
        </button> */}
        </div>
        <Card>
          <StepList steps={recipeData.steps} />
        </Card>
      </div>
    </>
  );
};

export default ScreenRecipe;
