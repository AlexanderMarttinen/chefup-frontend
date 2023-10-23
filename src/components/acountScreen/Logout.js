import React from "react";
import classes from './Account.module.css'
import ButtonPrimary from '../UI/ButtonPrimary'
const Logout = (props) => {
   
  return (
    
    <div className={`container ${classes.accountContainer}`}>
      <h1 style={{ textAlign: "left" }} className="h1-title">
        My Account
      </h1>
      <p style={{ textAlign: "left" }}>
        
        Currently signed in with:
        <span style={{ cursor: "default" }}>{props.user}</span>
      </p>
      <form className={classes.formContainer} onSubmit={props.logoutUser}>
        <ButtonPrimary text="Log out" />
      </form>
    </div>
  );
};

export default Logout;
