
import HomeScreen from './HomeScreen';
import ScreenRecipe from '../screenRecipe/Recipe';
import React, {useState} from 'react';
import NavBar from '../UI/NavBar';

const Home = (props) =>{
    const [parsedRecipe,setParsedRecipe] = useState({});

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
        <NavBar active='home' />
        {Object.keys(parsedRecipe).length === 0 && <HomeScreen pull_data={pull_data_app} /> }
        {Object.keys(parsedRecipe).length >0  && <ScreenRecipe recipe={parsedRecipe} goBack={returnHome}/> }
        </div>
    )
}

export default Home