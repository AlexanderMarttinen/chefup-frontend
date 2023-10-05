import React from "react";
import classes from './Ingredient.module.css'
const Step = (props) => {
  return (
    <label className={classes.step} htmlFor={props.id}>
      <input
        type="checkbox"
        id={props.id}
        
      />
      <p  >
        {props.name}
        <span >{props.amount}</span>
      </p>
    </label>
  );
};

export default Step;
