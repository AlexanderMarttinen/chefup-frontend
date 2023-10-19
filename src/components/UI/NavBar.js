import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import ImgHome from "../../assets/icons/home-fill.svg";
import ImgAccount from "../../assets/icons/account-fill.svg";
import ImgSaved from "../../assets/icons/saved-fill.svg";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useContext } from "react";
import UserContext from "../../store/user-context";
import { supabase } from "../../utils/supabase";
const NavBar = (props) => {
  const navigate = useNavigate();
  const homeLink = useRef(null);
  const userCtx = useContext(UserContext);


  const getSignedInState = async () => {
    console.log("getting logged in state")
    const { data, error } = await supabase.auth.getSession();
    if (data.session !== null) {
        userCtx.setSignedInUser(data.session.user);
        
    }
  };
  useEffect(() => {
   
    getSignedInState();
  }, []);
  
  const navClickHandler = (identifier, value) => {
    if (identifier === "home") {
      navigate("/");
    } else if (identifier === "saved") {
      navigate("/saved");
    } else {
      navigate("/account");
    }
  };

  return (
    <div className={classes.navbarContainer}>
      <div
        ref={homeLink}
        onClick={(event) => navClickHandler("home", event.target.value)}
        className={
          userCtx.activeTab === "home"
            ? `active ${classes.navItem}`
            : classes.navItem
        }
      >
        <img src={ImgHome} />
        <p>Home</p>
      </div>

      <div
        onClick={(event) => navClickHandler("saved", event.target.value)}
        className={
          userCtx.activeTab === "saved"
            ? `active ${classes.navItem}`
            : classes.navItem
        }
      >
        <img src={ImgSaved} />
        <p>Saved Recipes</p>
      </div>

      <div
        onClick={(event) => navClickHandler("account", event.target.value)}
        className={
          userCtx.activeTab === "account"
            ? `active ${classes.navItem}`
            : classes.navItem
        }
      >
        <img src={ImgAccount} />
        <p>{userCtx.signedIn!== null ? "Log out" : "Login/Sign Up"}</p>
      </div>
    </div>
  );
};

export default NavBar;
