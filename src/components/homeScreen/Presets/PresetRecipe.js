import React from "react";
import classes from "./PresetRecipe.module.css";
import ImgLink from '../../../assets/icons/link.png'
const PresetRecipe = (props) => {
  return (
    <div className={classes.presetContainer}>
      
        <img className={classes.presetImg} src={props.src}></img>
      
      <div className={classes.presetContent}>
        <h3 class="h3">{props.title}</h3>
        <p>
          {props.body}
        </p>
        <div className={classes.presetLinkBlock}>
            <img src={ImgLink}  width={14}/>
            <a href={props.link}>{props.linkDisplay}</a>
        </div>
      </div>
    </div>
  );
};

export default PresetRecipe;
