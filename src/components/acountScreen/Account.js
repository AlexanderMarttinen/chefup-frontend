import React from "react";
import NavBar from "../UI/NavBar";
import { useState, useRef, useEffect } from "react";
import classes from "./Account.module.css";
import Input from "../UI/Input";
import ButtonPrimary from "../UI/ButtonPrimaryIcon";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xrduaykrzrmjuueaxmul.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZHVheWtyenJtanV1ZWF4bXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMjA2MjUsImV4cCI6MjAxMjY5NjYyNX0.Hfms-KUZhwsONOUO5YVyskGQ2m9T9ZzZkm-e9jjWE0I"
);

const Account = (props) => {
  const [userLoginToggle, setUserLoginToggle] = useState(false);
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);
  const [useInfo, setUserInfo] = useState({});
  const signupEmailRef = useRef(null);
  const signupPasswordRef = useRef(null);
  const signupPasswordConfirmRef = useRef(null);

  const loginEmailRef = useRef(null);
  const loginPasswordRef = useRef(null);

  const getSignedInState = async () => {
    console.log("checking logged in");
    const { data, error } = await supabase.auth.getSession();
    if (data.session !== null) {
      setUserIsSignedIn(true);
     
      setUserInfo(data.session.user);
    }
  };
  useEffect(() => {
    getSignedInState();
  }, [userIsSignedIn]);

  const createAccountHandler = (event) => {
    event.preventDefault();

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
    createUser();
  };

  async function createUser() {
    console.log("creating user");
    const { data, error } = await supabase.auth.signUp({
      email: signupEmailRef.current.value,
      password: signupPasswordRef.current.value,
    });
   
  }
  async function logoutUser(event) {
    event.preventDefault();
    setUserIsSignedIn(false)
    const { error } = await supabase.auth.signOut();
    console.log(error);
  }

  const loginHandler = (event) => {
    event.preventDefault();
    loginUser()
  };

  async function loginUser() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmailRef.current.value,
      password: loginPasswordRef.current.value,
    });
    if(error===null){
        setUserIsSignedIn(true)
    }
  }

  const userActionToggleHandler = () => {
    setUserLoginToggle(!userLoginToggle);
  };

  return (
    <>
      <NavBar active="account"  userSignedIn={userIsSignedIn} />
      {userIsSignedIn ? (
        <div className={`container ${classes.accountContainer}`}>
          <h1 style={{ textAlign: "left" }} className="h1-title">
            My Account
          </h1>
          <p style={{ textAlign: "left" }}>
            {" "}
            Currently signed in with:{" "}
            <span style={{ cursor: "default" }}>{useInfo.email}</span>
          </p>

          <form className={classes.formContainer} onSubmit={logoutUser}>
            <ButtonPrimary text="Log out" />
          </form>
          {/* <div className={classes.divider}>
         <p>OR</p>
     </div> */}
        </div>
      ) : userLoginToggle ? (
        <div className={`container ${classes.accountContainer}`}>
          <h1 style={{ textAlign: "left" }} className="h1-title">
            Login
          </h1>
          <p style={{ textAlign: "left" }}>
            {" "}
            Don't have an account?{" "}
            <span onClick={userActionToggleHandler}>Create one now</span>
          </p>

          <form className={classes.formContainer} onSubmit={loginHandler}>
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
            <ButtonPrimary text="Login" />
          </form>
          {/* <div className={classes.divider}>
            <p>OR</p>
        </div> */}
        </div>
      ) : (
        <div className={`container ${classes.accountContainer}`}>
          <h1 style={{ textAlign: "left" }} className="h1-title">
            Sign up
          </h1>
          <p style={{ textAlign: "left" }}>
            {" "}
            Already have an account?{" "}
            <span onClick={userActionToggleHandler}>Login now</span>
          </p>

          <form
            className={classes.formContainer}
            onSubmit={createAccountHandler}
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
            <ButtonPrimary text="Sign up" />
          </form>
          {/* <div className={classes.divider}>
            <p>OR</p>
        </div> */}
        </div>
      )}
    </>
  );
};

export default Account;
