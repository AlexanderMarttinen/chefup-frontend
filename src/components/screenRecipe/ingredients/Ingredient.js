import React from "react";
import classes from './Ingredient.module.css'
const Step = (props) => {


  let newAmount = 0;
  if (props.amount.match('/')){
    const integers =  props.amount.match(/\d+/g);
    newAmount =  `${parseInt(integers[0])*parseFloat(props.amountMultiplier)} ${props.amount.slice(integers[0].length)}`;
  }else{
    const integers =  props.amount.match(/\d+/g);
    newAmount =  `${parseInt(integers[0])*parseFloat(props.amountMultiplier)} ${props.amount.slice(integers[0].length)}`;
  }

  



  return (
    <label className={classes.step} htmlFor={props.id}>
      <input
        type="checkbox"
        id={props.id}
        
      />
      <p  >
        {props.name}
        <span >{newAmount}</span> 
      </p>
    </label>
  );
};

export default Step;
