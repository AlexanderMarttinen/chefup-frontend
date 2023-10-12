import React, { useState,useEffect } from "react";
import classes from "./ScreenRecipe.module.css";
import Card from "../UI/Card/Card";
import IngredientList from './ingredients/IngredientList';
import StepList from "./steps/StepList"; 
import ImgArrow from '../../assets/icons/arrowLeft.png'
import ImgDownIcon from '../../assets/icons/chevron-down.png'
import ImgUpIcon from '../../assets/icons/chevron-up.png'
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://xrduaykrzrmjuueaxmul.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZHVheWtyenJtanV1ZWF4bXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMjA2MjUsImV4cCI6MjAxMjY5NjYyNX0.Hfms-KUZhwsONOUO5YVyskGQ2m9T9ZzZkm-e9jjWE0I");

const ScreenRecipe = (props) => {
 

  // TODO, fetch the recipe details from supabase based on the URL 
  const URLParameters = useParams();

  const DUMMY_DATA =  {
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


 const [recipeData,setRecipeData] = useState({
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
})
let [servesAmount,setServesAmount] = useState(parseInt(recipeData.serves));
 let [servesAmountMultiplier,setServesAmountMultiplier] = useState(parseInt(recipeData.serves));
  const handleBackClick = () =>{
    props.goBack()
 }
 let serveAmountDifference =1.5; 


 async function getRecipe() {
 
  console.log("getting recipe");
  const { data,error  } = await supabase.from("recipes").select().eq('id', `${URLParameters.id}`);
  setRecipeData(data[0]);

}


 useEffect(() => {
  // Update the document title using the browser API
  setServesAmountMultiplier(servesAmount/recipeData.serves)
  if(recipeData.name===''){
    getRecipe();
  }
 
},[serveAmountDifference,servesAmount,recipeData]);

 const handleUpClick = () =>{
  
  setServesAmount(servesAmount+1);
 
 }
 const handleDownClick = () =>{
 
  setServesAmount(servesAmount-1);
  
 }
  return (
    <div className={classes.container}>
    <div>
        <button onClick={handleBackClick} className={classes.btnSecondaryIcon}><img src={ImgArrow}/>Go Back</button>
    </div>
      <h1 className="h1-title">{recipeData.name}</h1>
      <p>
        {recipeData.description}
      </p>
      <h2 className={classes.cardTitle}>Ingredients</h2>
      <Card >
  
        <div className={classes.ingredientsActionContainer}>
          <p>Serves:</p>
          <h3>{servesAmount}</h3>
          <button onClick={handleDownClick}><img src={ImgDownIcon} width={12} /></button>
          <button onClick={handleUpClick}><img src={ImgUpIcon} width={12} /></button>
        </div>
        <IngredientList ingredients={recipeData.ingredients} amountMultiplier={servesAmountMultiplier} />
      </Card>
      <div className={classes.CardTitleContainer}>
      <h2 className={classes.cardTitle}>Instructions</h2>
      <button onClick={handleBackClick} className={classes.btnSecondaryIcon}><img src={ImgArrow}/>Change Recipe</button>
      </div>
      <Card>
        <StepList  steps={recipeData.steps} />
      </Card>
    </div>
  );
};

export default ScreenRecipe;
