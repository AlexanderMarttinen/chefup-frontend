import React from "react";
import classes from "./Step.module.css";
const Step = (props) => {
  return (
    <div className={classes.stepContainer}>
      <h3 className={classes.step}>{props.id}</h3>
      <p class="paragraph">{props.body}</p>
    </div>
  );
};

export default Step;
