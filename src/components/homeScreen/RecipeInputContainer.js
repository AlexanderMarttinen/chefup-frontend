import classes from "./RecipeInputContainer.module.css";
import Input from "../UI/Input";
import ButtonPrimaryIcon from "../UI/ButtonPrimaryIcon";
import { useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";
const RecipeInputContainer =  () => {
  const [enteredURL, setEnteredURL] = useState('')
  
  const handleURLChange = (e) => {
    const axios = require('axios'); 
  
    // 👇 Store the input value to local state
    setEnteredURL(e.target.value);
    console.log(enteredURL);
  };



  function submitURL() {
   
   

    axios.get('https://cors-anywhere.herokuapp.com/'+enteredURL) 
       .then(({ data }) => {
        const cheerio_ = cheerio.load(data);
        const paragraphs = cheerio_('h1,h2,h3,p,').text();
        console.log(paragraphs);
       });
  }

  return (
    <div className={classes["recipe-input-container"]}>
      <div className={classes["usp-container"]}>
        <div className={classes["usp-icon-container"]}>
          <img
            width={20}
            src="https://uploads-ssl.webflow.com/651eba29a68fbf41da558a48/651ebba44620e0b95f93a448_wand-green.png"
            alt="magic wand icon"
          ></img>
        </div>
        <p className={classes["paragraph"]}>
          Cut through the BS, and get <i>just</i> the recipe from websites
        </p>
      </div>
      <Input
          onChange={handleURLChange}
          type= "text"
          placeholder="Paste a recipe URL"
      />

        <ButtonPrimaryIcon handleClick={submitURL} src="https://uploads-ssl.webflow.com/651eba29a68fbf41da558a48/651ebba44620e0b95f93a448_wand-green.png"
            alt="magic wand icon" text ="Get the Recipe" />
    </div>
  );
};

export default RecipeInputContainer;
