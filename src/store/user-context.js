import React from "react";



const UserContext = React.createContext({
    signedIn:null,
    activeTab:"",
    setActiveTab:(tab)=>{},
    setSignedInUser:(status) =>{}
});


export default UserContext