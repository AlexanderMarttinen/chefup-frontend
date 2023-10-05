
import React,{ Fragment }  from "react";
import classes from './Card.module.css'
const Card = (props) =>{
    return(
        <>
        <h2>{props.title}</h2>
        <div className={classes.cardContainer}>
            {props.children}
        </div>
        </>
    )
}

export default Card