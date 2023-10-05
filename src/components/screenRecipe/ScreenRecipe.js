import React from "react";
import classes from "./ScreenRecipe.module.css";
import Card from "../UI/Card/Card";
import IngredientList from './ingredients/IngredientList';
import StepList from "./steps/StepList"; 
import ImgArrow from '../../assets/icons/arrowLeft.png'
const ScreenRecipe = (props) => {
 

  return (
    <div className={classes.container}>
    <div>
        <button className={classes.btnSecondaryIcon}><img src={ImgArrow}/>Go Back</button>
    </div>
      <h1 className="h1-title">Pesto Shrimp Pasta</h1>
      <p>
        This Pesto Shrimp Pasta is a restaurant quality meal that you can make
        in under 30 minutes! The perfect quick weeknight meal.
      </p>

      <Card title="Ingredients">
        <IngredientList />
      </Card>

      <Card title="Instructions">
        <StepList />
      </Card>
    </div>
  );
};

export default ScreenRecipe;
