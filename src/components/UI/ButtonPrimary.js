import React from "react";
import classes from './ButtonPrimaryIcon.module.css'
const ButtonPrimaryIcon = (props) =>{
    return(
        <button onClick={props.handleClick} className={classes.btnPrimary}>{props.text}</button>
    )
}

export default ButtonPrimaryIcon