import React, { useEffect } from "react";
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
   
    const { data, error } = await supabase.auth.getSession();
    if (data.session !== null) {
      userCtx.setSignedInUser(data.session.user);
    }
  };
  
  useEffect(() => {
    setTab();
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
    setTab();
  };
  const setTab = () => {
    const path = window.location.hash.split("/")[1];
  
    switch (path) {
      case "saved":
        userCtx.setActiveTab("saved");
        break;
      case "account":
        userCtx.setActiveTab("account");
        break;
      case "":
        userCtx.setActiveTab("home");
        break;
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
        <img src={ImgHome} alt="home logo" />
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
        <img src={ImgSaved} alt="bookmark logo" />
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
        <img src={ImgAccount} alt="account logo" />
        <p>{userCtx.signedIn !== null ? "Log out" : "Login/Sign Up"}</p>
      </div>
    </div>
  );
};

export default NavBar;
