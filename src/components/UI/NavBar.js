import React from "react";
import classes from './Navbar.module.css'
import ImgHome from '../../assets/icons/home-fill.svg'; 
import ImgAccount from '../../assets/icons/account-fill.svg'
import ImgSaved from '../../assets/icons/saved-fill.svg'
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
const NavBar = (props) =>{
    const navigate = useNavigate();
    const homeLink = useRef(null);

   
    const navClickHandler = (identifier, value) => {
        if (identifier === "home") {
            navigate("/")
        } else if (identifier === "saved") {
            navigate("/saved")
        } else {
            navigate("/account")
        }
      };

    return(
        <div className={classes.navbarContainer}>
            <div ref={homeLink} onClick={(event) => navClickHandler('home',event.target.value)} className={props.active==='home' ? `active ${classes.navItem}` : classes.navItem }>
            <img src={ImgHome} />
                <p>Home</p>
            </div>

            <div  onClick={(event) => navClickHandler('saved',event.target.value)} className={props.active==='saved' ? `active ${classes.navItem}` : classes.navItem}    >
                <img src={ImgSaved} />
                <p>Saved Recipes</p>
            </div>

            <div  onClick={(event) => navClickHandler('account',event.target.value)} className={props.active==='account' ? `active ${classes.navItem}` : classes.navItem}>
                <img src={ImgAccount} />
                <p>{props.userSignedIn ? 'Log out' : 'Login/Sign Up'}</p>
            </div>
        </div>
    )
}

export default NavBar