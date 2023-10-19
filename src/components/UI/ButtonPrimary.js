import React from "react";
import classes from './ButtonPrimaryIcon.module.css'
const ButtonPrimary = (props) =>{
    return(
        <button onClick={props.handleClick} className={classes.btnPrimary}>{props.text}</button>
    )
}

export default ButtonPrimary