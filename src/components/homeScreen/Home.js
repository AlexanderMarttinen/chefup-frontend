
import HomeScreen from './HomeScreen';
import ScreenRecipe from '../screenRecipe/Recipe';
import React, {useState,useEffect} from 'react';
import NavBar from '../UI/NavBar';
import { createClient } from "@supabase/supabase-js";

const Home = (props) =>{
    const [parsedRecipe,setParsedRecipe] = useState({});
    const [userIsSignedIn, setUserIsSignedIn] = useState(false);
    const getSignedInState = async () => {
      const supabase = createClient(
        "https://xrduaykrzrmjuueaxmul.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZHVheWtyenJtanV1ZWF4bXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMjA2MjUsImV4cCI6MjAxMjY5NjYyNX0.Hfms-KUZhwsONOUO5YVyskGQ2m9T9ZzZkm-e9jjWE0I"
      );
      const { data, error } = await supabase.auth.getSession();
      if (data.session !== null) {
        setUserIsSignedIn(true);
        
      }
    };

    useEffect(() => {
      getSignedInState()
    }, [userIsSignedIn]);
    const pull_data_app = (data) => {
      console.log("FROM THE APP"); 
      console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
      setParsedRecipe(data)
    }
    const returnHome = () =>{
      setParsedRecipe({})
    }
    return(
        <div>
        <NavBar active='home' userSignedIn={userIsSignedIn} />
        {Object.keys(parsedRecipe).length === 0 && <HomeScreen pull_data={pull_data_app} /> }
        {Object.keys(parsedRecipe).length >0  && <ScreenRecipe recipe={parsedRecipe} goBack={returnHome}/> }
        </div>
    )
}

export default Home