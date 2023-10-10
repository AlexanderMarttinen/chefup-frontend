import React from "react";
import classes from "./ScreenRecipe.module.css";
import Card from "../UI/Card/Card";
import IngredientList from './ingredients/IngredientList';
import StepList from "./steps/StepList"; 
import ImgArrow from '../../assets/icons/arrowLeft.png'
const ScreenRecipe = (props) => {
 const handleBackClick = () =>{
    props.goBack()
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

      <Card title="Ingredients">
        <IngredientList ingredients={props.recipe.ingredients} />
      </Card>

      <Card title="Instructions">
        <StepList  steps={props.recipe.steps} />
      </Card>
    </div>
  );
};

export default ScreenRecipe;
