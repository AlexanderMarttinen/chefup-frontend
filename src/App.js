import './App.css';
import HomeScreen from './components/homeScreen/HomeScreen';
import ScreenRecipe from './components/screenRecipe/ScreenRecipe';
import React, {useState} from 'react';

function App() {
  const [parsedRecipe,setParsedRecipe] = useState({});

  const pull_data_app = (data) => {
    console.log("FROM THE APP"); 
    console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    setParsedRecipe(data)
  }
  const returnHome = () =>{
    setParsedRecipe({})
  }
  return (
    <div className="App">
       {Object.keys(parsedRecipe).length === 0 && <HomeScreen pull_data={pull_data_app} /> }
       {Object.keys(parsedRecipe).length >0  && <ScreenRecipe recipe={parsedRecipe} goBack={returnHome}/> }
    </div>
  );
}

export default App;

