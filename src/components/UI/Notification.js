import React from "react";
import classes from './Notification.module.css'
import ImgInfo from '../../assets/icons/icon-info.png'
import ImgClose from '../../assets/icons/icon-notification-x.png'
const Notification = (props) =>{
    return(
        <div className={classes.notificationContainer}>
            <img width={14}  height ={14} src={ImgInfo} />
            <p>{props.text}</p>
            <button className={classes.btnNotificationPrimary}> {props.buttonText}</button>
            <button className={classes.btnNotificationClose}> <img width={24}src={ImgClose}/> </button>
        </div>
    )
}

export default Notification