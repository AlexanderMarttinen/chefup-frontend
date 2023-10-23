import React from "react";
import classes from "./Account.module.css";
import { useRef } from "react";
import ButtonPrimary from "../UI/ButtonPrimary";

const Login = (props) => {
  const loginEmailRef = useRef(null);
  const loginPasswordRef = useRef(null);
   
  return (
    <div className={`container ${classes.accountContainer}`}>
      <h1 style={{ textAlign: "left" }} className="h1-title">
        Login
      </h1>
      <p style={{ textAlign: "left" }}>
        {" "}
        Don't have an account?{" "}
        <span onClick={props.actionToggle}>Create one now</span>
      </p>
      <form
        id="form-login"
        className={classes.formContainer}
        onSubmit={(event) => {
          event.preventDefault();
          props.login(
            loginEmailRef.current.value,
            loginPasswordRef.current.value
          );
        }}
      >
        <label htmlFor="email">Email:</label>
        <input
          ref={loginEmailRef}
          placeholder="Enter your Email"
          id="email"
          type="email"
        />
        <label htmlFor="password">Password:</label>
        <input
          ref={loginPasswordRef}
          type="password"
          placeholder="Enter your Password"
          id="password"
        />
        <ButtonPrimary text="Login" type="submit" form="form-login" />
      </form>
    </div>
  );
};

export default Login;
