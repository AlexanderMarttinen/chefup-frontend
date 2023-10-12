import React, { useState,useEffect } from "react";
import classes from "./ScreenRecipe.module.css";
import Card from "../UI/Card/Card";
import IngredientList from './ingredients/IngredientList';
import StepList from "./steps/StepList"; 
import ImgArrow from '../../assets/icons/arrowLeft.png'
import ImgDownIcon from '../../assets/icons/chevron-down.png'
import ImgUpIcon from '../../assets/icons/chevron-up.png'

const ScreenRecipe = (props) => {
 
 let [servesAmount,setServesAmount] = useState(parseInt(props.recipe.serves));
 let [servesAmountMultiplier,setServesAmountMultiplier] = useState(parseInt(props.recipe.serves));
  const handleBackClick = () =>{
    props.goBack()
 }
 let serveAmountDifference =1.5; 

 useEffect(() => {
  // Update the document title using the browser API
  setServesAmountMultiplier(servesAmount/props.recipe.serves)
},[serveAmountDifference,servesAmount]);

 const handleUpClick = () =>{
  console.log("clicked up");
  setServesAmount(servesAmount+1);
 
 }
 const handleDownClick = () =>{
  console.log("clicked down");
  setServesAmount(servesAmount-1);
  
 }
  return (
    <div className={classes.container}>
    <div>
        <button onClick={handleBackClick} className={classes.btnSecondaryIcon}><img src={ImgArrow}/>Go Back</button>
    </div>
      <h1 className="h1-title">{props.recipe.name}</h1>
      <p>
        {props.recipe.description}
      </p>
      <h2 className={classes.cardTitle}>Ingredients</h2>
      <Card >
    
        <div className={classes.ingredientsActionContainer}>
          <p>Serves:</p>
          <h3>{servesAmount}</h3>
          <button onClick={handleDownClick}><img src={ImgDownIcon} width={12} /></button>
          <button onClick={handleUpClick}><img src={ImgUpIcon} width={12} /></button>
        </div>
        <IngredientList ingredients={props.recipe.ingredients} amountMultiplier={servesAmountMultiplier} />
      </Card>
      <div className={classes.CardTitleContainer}>
      <h2 className={classes.cardTitle}>Instructions</h2>
      <button onClick={handleBackClick} className={classes.btnSecondaryIcon}><img src={ImgArrow}/>Change Recipe</button>
      </div>
      <Card>
        <StepList  steps={props.recipe.steps} />
      </Card>
    </div>
  );
};

export default ScreenRecipe;
