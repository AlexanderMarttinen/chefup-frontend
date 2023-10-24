import React from "react";
import { useState, useContext,useEffect } from "react";
import { supabase } from "../../utils/supabase";
import UserContext from "../../store/user-context";
import Logout from "./Logout";
import Login from "./Login";
import Signup from "./Signup";
import Sent from "./Sent";

const Account = (props) => {
  const [userLoginToggle, setUserLoginToggle] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const userCtx = useContext(UserContext);

  async function createUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    setEmailSent(true);
  }
  async function logoutUserHandler(event) {
    event.preventDefault();
    const { error } = await supabase.auth.signOut();
    userCtx.setSignedInUser(null);
  }
  async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error === null) {
      userCtx.setSignedInUser(data.session.user);
    }
  }
  const userActionToggleHandler = () => {
    setUserLoginToggle(!userLoginToggle);
  };

  return (
    <>
      {emailSent ? (
        <Sent />
      ) : (
        userCtx.signedIn !== null ? (
          <Logout
            user={userCtx.signedIn.email}
            logoutUser={logoutUserHandler}
          />
        ) : userLoginToggle ? (
          <Login actionToggle={userActionToggleHandler} login={loginUser} />
        ) : (
          <Signup signup={createUser} actionToggle={userActionToggleHandler} />
        )
        
      )}
    </>
  );
};
export default Account;
