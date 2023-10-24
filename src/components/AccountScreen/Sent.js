import React from "react";
import classes from "./Account.module.css";
import ImgMail from '../../assets/ill-mail.jpg';
const Sent = () => {
  return (
    <div className={`container ${classes.accountContainer}`}>
      <h1 style={{ textAlign: "center" }} className="h1-title">
        Verification Email Sent
      </h1>
      <img className={classes.maiImg} src={ImgMail}></img>
      <p style={{ textAlign: "center" }}>
        Please check the email inbox you used to sign up with. You may need to
        check the spam folder. The email will be from:
        <span>noreply@mail.app.supabase.io</span>
      </p>
      
    </div>
  );
};

export default Sent;
