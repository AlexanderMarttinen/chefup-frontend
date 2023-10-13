import React from "react";
import SavedCard from "./SavedCard";
import classes from './SavedCardList.module.css'
import { useNavigate } from "react-router-dom";
const SavedCardList = (props) => {
 
  return (
    <div className={classes.savedCardList}>
      {props.recipes.map((recipe,i) => (
       
        <SavedCard
        title={recipe.name}
        description={recipe.description}
        id = {recipe.id}
        key={i}
        
        >
           </SavedCard>
      ))}
     
     
    </div>
  );
};

export default SavedCardList;
