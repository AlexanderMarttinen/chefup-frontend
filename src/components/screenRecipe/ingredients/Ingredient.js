import React from "react";
import classes from './Ingredient.module.css'
const Step = (props) => {


  let newAmount = 0;
  if (props.amount.match('/')){
    const integers =  props.amount.match(/\d+/g);
    try{
   
    newAmount =  `${parseInt(integers[0])*parseFloat(props.amountMultiplier)} ${props.amount.slice(integers[0].length)}`;
    }catch(err){
      
     newAmount =  `${props.amount}`;
    }
  }else{
    const integers =  props.amount.match(/\d+/g);
    try{
     
    newAmount =  `${parseInt(integers[0])*parseFloat(props.amountMultiplier)} ${props.amount.slice(integers[0].length)}`;
    }catch(err){
   
     newAmount =  `${props.amount}`;
    }
    
  }

  



  return (
    <label className={classes.step} htmlFor={props.id}>
      <input
        type="checkbox"
        id={props.id}
        
      />
      <p  >
        {props.ingredient}
        <span >{newAmount}</span> 
      </p>
    </label>
  );
};

export default Step;
