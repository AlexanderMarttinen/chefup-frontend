import React from "react";
import classes from "./Account.module.css";
import ButtonPrimary from "../UI/ButtonPrimary";
import { useRef } from "react";
const Signup = (props) => {
  const signupEmailRef = useRef(null);
  const signupPasswordRef = useRef(null);
  const signupPasswordConfirmRef = useRef(null);
  const handleSignup = (event) => {
    event.preventDefault();
    console.log("handle signup")
    if (
      signupPasswordRef.current.value !== signupPasswordConfirmRef.current.value
    ) {
      alert("Passwords must match");
      return;
    }
    if (
      signupEmailRef.current.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) === false
    ) {
      alert("Please enter a valid email address");
      return;
    }
    props.signup(signupEmailRef.current.value, signupPasswordRef.current.value);
  };

  return (
    <div className={`container ${classes.accountContainer}`}>
      <h1 style={{ textAlign: "left" }} className="h1-title">
        Sign up
      </h1>
      <p style={{ textAlign: "left" }}>
        Already have an account?
        <span onClick={props.actionToggle}>Login now</span>
      </p>
      <form
        id="form-signup"
        className={classes.formContainer}
        onSubmit={handleSignup}
      >
        <label htmlFor="email">Email:</label>
        <input
          ref={signupEmailRef}
          placeholder="Enter your Email"
          id="email"
          type="email"
        />
        <label htmlFor="password">Password:</label>
        <input
          ref={signupPasswordRef}
          type="password"
          placeholder="Enter your Password"
          id="password"
        />
        <label htmlFor="passwordConfirm">Confirm Password:</label>
        <input
          ref={signupPasswordConfirmRef}
          type="password"
          placeholder="Re-enter your Password"
          id="passwordConfirm"
        />
        <ButtonPrimary text="Sign up" type="submit" form="form-signup" />
      </form>
    </div>
  );
};

export default Signup;
