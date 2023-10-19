import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { supabase } from "../../utils/supabase";
import UserContext from "../../store/user-context";
import Logout from "./Logout";
import Login from "./Login";
import Signup from "./Signup";
const Account = (props) => {
  const [userLoginToggle, setUserLoginToggle] = useState(false);
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);
  const userCtx = useContext(UserContext);
  useEffect(() => {
    userCtx.setActiveTab("account");
  }, [userIsSignedIn]);
  async function createUser(email,password) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    });
  }
  async function logoutUserHandler(event) {
    event.preventDefault();
    const { error } = await supabase.auth.signOut();
  }
  async function loginUser(email,password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    if (error === null) {
      setUserIsSignedIn(true);
    }
  }
  const userActionToggleHandler = () => {
    setUserLoginToggle(!userLoginToggle);
  };
  const renderContent = () => {
    if (userCtx.signedIn !== null ) {
      return <Logout user={userCtx.signedIn.email} logoutUser={logoutUserHandler} />;
    } else {
      return userLoginToggle ? <Login actionToggle={userActionToggleHandler} login={loginUser} /> : <Signup signup={createUser} actionToggle={userActionToggleHandler} />;
    }
  };
  return <>{renderContent()}</>;
};
export default Account;
