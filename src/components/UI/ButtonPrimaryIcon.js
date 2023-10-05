import React from "react";
import classes from './ButtonPrimaryIcon.module.css'
const ButtonPrimaryIcon = (props) =>{
    return(
        <button onClick={props.handleClick} className="btnPrimary"> <img
            width={14}
            src={props.src}
            alt ={props.alt}
          ></img>{props.text}</button>
    )
}

export default ButtonPrimaryIcon