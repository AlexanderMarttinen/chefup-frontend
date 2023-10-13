import React from "react";
import classes from './SavedCard.module.css'
import { useNavigate } from "react-router-dom";

const SavedCard = (props) =>{
    const navigate = useNavigate();
    const handleNavigateClick = () => {
         navigate(`/recipe/${props.id}`)
    }
    return(
        <div onClick = {handleNavigateClick}  className={classes.savedCardContainer} >
            <h4>{props.title}</h4>
            <p>{props.description}</p>
        </div>
    )
}

export default SavedCard