import UserContext from "./user-context";
import { useReducer } from "react";

const defaultUserState = {
  signedIn: null,
  activeTab: "",
};

const userReducer = (state, action) => {
    
  if (action.type === "NAVIGATE") {
    
    return {
        ...state,
      activeTab: action.tab,
    };
  }
  if (action.type === "STATUS") {
    
    return {
      ...state,
      signedIn:action.status
    };
  }
  return defaultUserState;
};

const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );
  const setActiveTabHandler = (tab) => {
    dispatchUserAction({ type: "NAVIGATE", tab: tab });
  };

  const setSignedInUserHandler = (status) => {
    dispatchUserAction({ type: "STATUS", status: status });
  };



  const userContext = {
    signedIn: userState.signedIn,
    activeTab: userState.activeTab,
    setActiveTab: setActiveTabHandler,
    setSignedInUser:setSignedInUserHandler

  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
