import classes from "./RecipeInputContainer.module.css";
import Input from "../UI/Input";
import ButtonPrimaryIcon from "../UI/ButtonPrimaryIcon";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import OpenAI from "openai";
import Modal from "../UI/Modal";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import LoadingModalContents from "./LoadingModalContents";
const RecipeInputContainer = (props) => {
  //DECLARE STATE
  const [recipeSearchTerm, setReceipeSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [stageRecipeComplete, setStageRecipeComplete] = useState({
    message: "Finding a recipe",
    class: "stageFinding",
  });
  const [stageIngredientsComplete, setStageIngredientsComplete] = useState({
    message: "Find Ingredients",
    class: "stagePending",
  });
  const [stageStepsComplete, setStageStepsComplete] = useState({
    message: "Find Instructions",
    class: "stagePending",
  });
  const resultRef = useRef();
  useEffect(() => {
    resultRef.current = result;
  }, [result]);
  const supabase = createClient(
    "https://xrduaykrzrmjuueaxmul.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZHVheWtyenJtanV1ZWF4bXVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMjA2MjUsImV4cCI6MjAxMjY5NjYyNX0.Hfms-KUZhwsONOUO5YVyskGQ2m9T9ZzZkm-e9jjWE0I"
  );
  const navigate = useNavigate();

  const TEST_DATA = {
    "name":"Pork Shoulder Roast",
    "description":"A tender and flavorful pork shoulder roast that is perfect for a hearty meal.",
    "serves":8,
    "cooktime":240,
    "ingredients":[
       {
          "ingredient":"boneless pork shoulder",
          "amount":"4 pounds"
       },
       {
          "ingredient":"garlic cloves",
          "amount":"6"
       },
       {
          "ingredient":"olive oil",
          "amount":"2 tablespoons"
       },
       {
          "ingredient":"salt",
          "amount":"2 teaspoons"
       },
       {
          "ingredient":"ground black pepper",
          "amount":"1 teaspoon"
       },
       {
          "ingredient":"dried thyme",
          "amount":"1 teaspoon"
       },
       {
          "ingredient":"onion",
          "amount":"1 large, sliced"
       },
       {
          "ingredient":"chicken broth",
          "amount":"1 cup"
       }
    ],
    "steps":[
       {
          "body":"Preheat the oven to 325°F (165°C)."
       },
       {
          "body":"Make small incisions in the pork shoulder and insert the garlic cloves."
       },
       {
          "body":"Rub the pork shoulder with olive oil and season with salt, black pepper, and dried thyme."
       },
       {
          "body":"Place the sliced onion at the bottom of a roasting pan."
       },
       {
          "body":"Put the pork shoulder on top of the onion and pour the chicken broth into the pan."
       },
       {
          "body":"Cover the pan with foil and roast for 3 hours."
       },
       {
          "body":"Remove the foil and continue roasting for another hour, or until the pork shoulder is tender and the internal temperature reaches 145°F (63°C)."
       },
       {
          "body":"Let the roast rest for 10 minutes before slicing and serving."
       }
    ]
 }

  const handleRecipe = (data) => {
    setIsLoading(false);
    //writeRecipeToDatabase(data)
    navigateToRecipe(data)
    //props.handleRecipe(data);
    // return parsedRecipe
  };
 // navigateToRecipe(TEST_DATA)
  const navigateToRecipe = async (recipeData) => {
    const { error } = await supabase
    .from("recipes")
    .insert({
      name: recipeData.name,
      description:recipeData.description,
      serves:recipeData.serves,
      cook_time:recipeData.cooktime,
      ingredients:recipeData.ingredients,
      steps:recipeData.steps
    });
    const { data, errorFetching } = await supabase
    .from('recipes')
    .select()
    .eq("name", recipeData.name);
    console.log(data);
   navigate(`/recipe/${data[0].id}`)
  }
  
  const writeRecipeToDatabase = async(data) =>{
    // const { error } = await supabase
    // .from("recipes")
    // .insert({
    //   name: data.name,
    //   description:data.description,
    //   serves:data.serves,
    //   cook_time:data.cooktime,
    //   ingredients:data.ingredients,
    //   steps:data.steps
    // });
  };
  
  // SET UP OPEN AI
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  const handleRecipeSearchTermChange = (e) => {
    // 👇 Store the input value to local state
    setReceipeSearchTerm(e.target.value);
    console.log(recipeSearchTerm);
  };

  async function generateRecipe() {
    setIsLoading(true);

    //const finalResponse = await FetchRecipe(recipeSearchTerm)
    FetchRecipe(recipeSearchTerm);
    // console.log(finalResponse);
    // const jsonResponse = JSON.parse(finalResponse)
    // handleRecipe(jsonResponse)
  }

  const FetchRecipe = async (SEARCH_TERM) => {
    if (SEARCH_TERM !== "") {
      try {
    

        const response = await fetch("https://recipe-api-edge-functions.netlify.app/createRecipe", {
          method: "post",
          // headers: {
          //   Accept: "application/json, text/plain, */*",
          //   "Content-Type": "application/json",
          // },
          body: JSON.stringify({
            recipe: `${SEARCH_TERM}`,
          }),
        });
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const loopRunner = true;

        while (loopRunner) {
          // Here we start reading the stream, until its done.
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          const decodedChunk = decoder.decode(value, { stream: true });
          console.log(decodedChunk);
          setResult((result) => result + decodedChunk); // update state with new chunk
          //Catch when working on ingredients.

          try {
            //TODO: refactor this try catch, so that we only parse decodedChunk once, to manage the stage.
            if (decodedChunk.match("ingredient").length > 0) {
              setStageRecipeComplete({
                message: "Found a recipe",
                class: "stageFound",
              });
              setStageIngredientsComplete({
                message: "Listing Ingredients",
                class: "stageFinding",
              });
            }
          } catch (error) {}

          try {
            if (decodedChunk.match("body").length > 0) {
              console.log("FOUND body");
              setStageIngredientsComplete({
                message: "Finished Listing Ingredients",
                class: "stageFound",
              });
              setStageStepsComplete({
                message: "Writing instructions",
                class: "stageFinding",
              });
            }
          } catch (error) {}

          //Catch when working on steps
        }

        try{
          console.log("COMPLETED");
          console.log(resultRef.current);
          const jsonResponse = JSON.parse(resultRef.current)
          handleRecipe(jsonResponse)
        }catch(error){
          console.log(error)
          alert(error);
        }
     
     
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={classes["recipe-input-container"]}>
      {isLoading && (
        <Modal>
          <LoadingModalContents
            findRecipe={stageRecipeComplete}
            findIngredients={stageIngredientsComplete}
            findSteps={stageStepsComplete}
          />
        </Modal>
      )}
      {/* <div className={classes["usp-container"]}>
        <div className={classes["usp-icon-container"]}>
          <img
            width={20}
            src="https://uploads-ssl.webflow.com/651eba29a68fbf41da558a48/651ebba44620e0b95f93a448_wand-green.png"
            alt="magic wand icon"
          ></img>
        </div>
        <p className={classes["paragraph"]}>
          Leverage technology to craft the perfect cookie recipe
        </p>
      </div> */}
      <Input
        onChange={handleRecipeSearchTermChange}
        type="text"
        placeholder="Enter in what you would like a recipe for"
      />

      <ButtonPrimaryIcon
        handleClick={generateRecipe}
        src="https://uploads-ssl.webflow.com/651eba29a68fbf41da558a48/651ebba44620e0b95f93a448_wand-green.png"
        alt="magic wand icon"
        text="Get the Recipe"
      />
    </div>
  );
};

export default RecipeInputContainer;
