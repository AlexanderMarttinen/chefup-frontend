import classes from "./RecipeInputContainer.module.css";
import Input from "../UI/Input";
import ButtonPrimaryIcon from "../UI/ButtonPrimaryIcon";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import OpenAI from "openai";
import Modal from "../UI/Modal";

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

  const handleRecipe = (data) => {
    setIsLoading(false);
    props.handleRecipe(data);
    // return parsedRecipe
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
        // const source = axios.post(
        //   "https://api.openai.com/v1/chat/completions",
        //   {
        //     messages: [
        //       {
        //         role: "user",
        //         content: `You are a machine that is built to respond to prompts using strictly JSON format. No additional text is to be included in your response. I am going to provide you with a cooking instructions. You need to reply with a JSON object using the following schema:

        //         {
        //           name:"the title of the recipe formatted as a String",
        //           description:"a brief one sentence description of the recipe formatted as a string",
        //           serves:"the mode number of servings that this recipe will provide formatted as an int",
        //           cooktime:"the estimated total time in minutes for this recipe to be cooked formatted as an int",
        //           ingredients:[{'ingedient':'name of ingredient 1 , 'amount': 'quantity of ingredient 1 for the recipe'},{'ingedient':'name of ingredient 2 , 'amount': 'quantity of ingredient 2 for the recipe' }],
        //           steps:[{body:"a very brief and concise explanation for step 1 of the recipe"},{body:"a very brief and concise explanation for step 2 of the recipe"}]
        //           }
        //     note: the steps and ingredients properties, will be an array that covers all necessary ingredients and instructions for the recipe.

        //     Now provide me a JSON object for ${SEARCH_TERM}`,
        //       },
        //     ],
        //     model: "gpt-3.5-turbo",
        //     max_tokens: 600,
        //     n: 1,
        //     temperature: 0.55,
        //     stream:true,

        //   },
        //   { responseType: "stream" },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer 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`,
        //     },
        //   }
        // );

        const response = await fetch("http://localhost:2000/aiCompletion", {
          method: "post",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userPrompt: `You are a machine that is built to respond to prompts using strictly JSON format. No additional text is to be included in your response. You need to reply with a JSON object using the following schema:

                 {
                   name:"the title of the recipe formatted as a String",
                   description:"a brief one sentence description of the recipe formatted as a string",
                   serves:"the mode number of servings that this recipe will provide formatted as an int",
                   cooktime:"the estimated total time in minutes for this recipe to be cooked formatted as an int",
                   ingredients:[{'ingedient':'name of ingredient 1 , 'amount': 'quantity of ingredient 1 for the recipe'},{'ingedient':'name of ingredient 2 , 'amount': 'quantity of ingredient 2 for the recipe' }],
                   steps:[{body:"a very brief and concise explanation for step 1 of the recipe"},{body:"a very brief and concise explanation for step 2 of the recipe"}]
                   }
             note: the steps and ingredients properties, will be an array that covers all necessary ingredients and instructions for the recipe.
            
             Now provide me a Recipe in the form of a JSON object for how I can make ${SEARCH_TERM}`,
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
                message: "Finding Ingredients",
                class: "stageFinding",
              });
            }
          } catch (error) {}

          try {
            if (decodedChunk.match("body").length > 0) {
              console.log("FOUND body");
              setStageIngredientsComplete({
                message: "Found Ingredients",
                class: "stageFound",
              });
              setStageStepsComplete({
                message: "Finding instructions",
                class: "stageFinding",
              });
            }
          } catch (error) {}

          //Catch when working on steps
        }
        console.log("COMPLETED");
        console.log(resultRef.current);
     const jsonResponse = JSON.parse(resultRef.current)
     handleRecipe(jsonResponse)
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
