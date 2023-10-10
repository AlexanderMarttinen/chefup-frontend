import classes from "./RecipeInputContainer.module.css";
import Input from "../UI/Input";
import ButtonPrimaryIcon from "../UI/ButtonPrimaryIcon";

import  React, { useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";

import OpenAI from "openai";
import Modal from "../UI/Modal";
const RecipeInputContainer = (props) => {
  //DECLARE STATE
  const [enteredURL, setEnteredURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const handleRecipe = (data) => {
    setIsLoading(false);
    props.handleRecipe(data)
    // return parsedRecipe
  };
 

  // SET UP OPEN AI
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  const handleURLChange = (e) => {
    // 👇 Store the input value to local state
    setEnteredURL(e.target.value);
    console.log(enteredURL);
  };

  async function submitURL() {
    setIsLoading(true)
    axios
      .get("https://cors-anywhere.herokuapp.com/" + enteredURL)
      .then(({ data }) => {
        const cheerio_ = cheerio.load(data);
        const text = cheerio_("h1,h2,h3,p,span").text();
        //console.log(text);
        openAIChunk(text);
      });
  }

  async function generateRecipe() {
    setIsLoading(true)
   
    const finalResponse = await NEWOpenAIFinalProcessing(enteredURL)
    console.log(finalResponse);
    const jsonResponse = JSON.parse(finalResponse)
    handleRecipe(jsonResponse)
  }


  function splitText(text) {
    const maxChunkSize = 3648;
    const chunks = [];
    let currentChunk = "";

    text.split(".").forEach((sentence) => {
      if (currentChunk.length + sentence.length + 1 <= maxChunkSize) {
        currentChunk += sentence + ".";
      } else {
        chunks.push(currentChunk.trim());
        currentChunk = sentence + ".";
      }
    });

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }
    console.log(chunks);
    return chunks;
  }

  const openAIChunk = async (scrapedText) => {
    const inputChunks = splitText(scrapedText);
    // const outputChunks = [
    //   "NULL",
    //   "NULL",
    //   "Name of the recipe: Pesto Shrimp Pasta\nCook time: Not specified\nServing portion amount: Not specified\nList of ingredients and quantities: shrimp, pasta, pesto sauce\nCooking instructions: Not provided",
    //   "Recipe: Pesto Shrimp Pasta\nCook time: Not specified\nServing portion amount: 1 serving\nList of ingredients and quantities: \n- ½ lb. angel hair pasta\n- 1 tablespoon olive oil\n- 12 oz. shrimp (41-60 size)\n- 1 pint grape tomatoes\n- 2 cloves minced garlic\n- ¼ cup pesto\n- Grated Parmesan (to taste)\n- Chopped parsley (optional, for garnish)\n- Crushed red pepper (optional, for spice)\n\nCooking instructions:\n1. Bring a large pot of water to a boil and cook the angel hair pasta until tender. Reserve ½ cup of the pasta water before draining.\n2. In a large skillet, heat 1 tablespoon of olive oil and sauté the shrimp until pink and opaque. Remove the shrimp from the skillet and set aside.\n3. In the same skillet, add another tablespoon of olive oil and sauté the grape tomatoes and minced garlic until the tomatoes begin to burst and break down.\n4. Add the cooked and drained pasta, pesto, and half of the reserved pasta water to the skillet. Stir to coat everything in the pesto, adding more pasta water if needed.\n5. Return the cooked shrimp to the skillet and stir to combine with the pasta and pesto.\n6. Serve the dish topped with grated Parmesan. Optional: garnish with chopped parsley and crushed red pepper for added flavor.\n",
    //   "Name of the recipe: Pesto Shrimp Pasta\nCook time: 25 minutes\nServing portion amount: 4 servings\n\nList of ingredients and quantities:\n- 12 oz. shrimp, peeled and deveined\n- 8 oz. angel hair pasta\n- 2 tbsp olive oil, divided\n- 2 cloves garlic, minced\n- 1 pint grape tomatoes\n- 1/4 cup basil pesto\n- 1 tbsp grated Parmesan\n\nCooking instructions:\n1. If using frozen shrimp, thaw them by placing them in a colander and running cool water over top. Peel the shrimp and remove the tails. Pat the shrimp dry with a paper towel.\n2. Bring a large pot of water to a boil for the pasta. Add the pasta and boil until tender (about seven minutes). Reserve about ½ cup of the starchy pasta water before draining the pasta in a colander.\n3. While the pasta is cooking, heat 1 tbsp olive oil in a large skillet. Once hot, add the prepared shrimp and sauté until the shrimp turns pink and opaque (2-3 minutes). Remove the cooked shrimp to a clean bowl.\n4. Add another tablespoon of olive oil to the skillet and add the grape tomatoes and minced garlic. Sauté until the tomatoes begin to burst and release their juices. If the garlic begins to brown before the tomatoes have burst, add a couple tablespoons of water to the skillet to slow the browning.\n5. Once the tomatoes have broken down in the skillet, add the cooked and drained pasta, ¼ cup pesto, and about half of the reserved pasta water.",
    // ];
    const outputChunks = [];

    const promises = inputChunks.map( async chunk => {
      outputChunks.push(await OpenAIChunkProcessing(chunk));
    });

    await Promise.all(promises);
    const finalResponse = await OpenAIFinalProcessing(outputChunks.toString())
    console.log(finalResponse);
    const jsonResponse = JSON.parse(finalResponse)

    // const jsonResponse = {
    //   name: "Pesto Shrimp Pasta",
    //   description: "A delicious pasta dish with shrimp and pesto sauce.",
    //   serves: 4,
    //   cooktime: 25,
    //   ingredients: [
    //     {
    //       ingredient: "12 oz. shrimp, peeled and deveined",
    //     },
    //     {
    //       ingredient: "8 oz. angel hair pasta",
    //     },
    //     {
    //       ingredient: "2 tbsp olive oil, divided",
    //     },
    //     {
    //       ingredient: "2 cloves garlic, minced",
    //     },
    //     {
    //       ingredient: "1 pint grape tomatoes",
    //     },
    //     {
    //       ingredient: "1/4 cup basil pesto",
    //     },
    //     {
    //       ingredient: "1 tbsp grated Parmesan",
    //     },
    //   ],
    //   steps: [
    //     {
    //       body: "If using frozen shrimp, thaw them by placing them in a colander and running cool water over top. Peel the shrimp and remove the tails. Pat the shrimp dry with a paper towel.",
    //     },
    //     {
    //       body: "Bring a large pot of water to a boil for the pasta. Add the pasta and boil until tender (about seven minutes). Reserve about ½ cup of the starchy pasta water before draining the pasta in a colander.",
    //     },
    //     {
    //       body: "While the pasta is cooking, heat 1 tbsp olive oil in a large skillet. Once hot, add the prepared shrimp and sauté until the shrimp turns pink and opaque (2-3 minutes). Remove the cooked shrimp to a clean bowl.",
    //     },
    //     {
    //       body: "Add another tablespoon of olive oil to the skillet and add the grape tomatoes and minced garlic. Sauté until the tomatoes begin to burst and release their juices. If the garlic begins to brown before the tomatoes have burst, add a couple tablespoons of water to the skillet to slow the browning.",
    //     },
    //     {
    //       body: "Once the tomatoes have broken down in the skillet, add the cooked and drained pasta, ¼ cup pesto, and about half of the reserved pasta water.",
    //     },
    //   ],
    // };
    
    handleRecipe(jsonResponse);
  };

  const OpenAIChunkProcessing = async (chunk) => {
    console.log("running Open AI");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content: `Scan this task for the name of the recipe, the cook time, serving portion amount,  list of ingredients and quantities, and cooking instructions. If nothing is found, return as NULL, otherwise  List out any ingredients and the steps necessary to cook the recipe: ${chunk}`,
            },
          ],
          model: "gpt-3.5-turbo",
          max_tokens: 300,
          n: 1,
          temperature: 0.25,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
        }
      );

      console.log("response: ", response.data.choices[0].message.content);
      return response.data.choices[0].message.content;
    } catch (err) {
      console.log(err);
    }
  };

  const OpenAIFinalProcessing = async (summarizedText) => {
    console.log("FINAL PROCESSING:");
    console.log(summarizedText)
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content: `You are a machine that is built to respond to prompts using strictly JSON format. No additional text is to be included in your response. I am going to provide you with a cooking instructions. You need to reply with a JSON object using the following schema:

          {
          name:"the title of the recipe formatted as a String",
          description:"a brief one sentence description of the recipe formatted as a string",
          serves:"the mode number of servings that this recipe will provide formatted as an int",
          cooktime:"the estimated total time in minutes for this recipe to be cooked formatted as an int",
          ingredients:[{'ingedient':'name of ingredient 1 and the quantity. any fractions need to be formatted as an integer'},{'ingedient':'name of ingredient 2 and the quantity. any fractions need to be formatted as an integer'}],
          steps:[{body:"a very brief and concise explanation for step 1 of the recipe"},{body:"a very brief and concise explanation for step 2 of the recipe"}]
          }
          note: the steps and ingredients properties, will be an array that covers all necessary ingredients and instructions for the recipe.  ${summarizedText}`,
            },
          ],
          model: "gpt-3.5-turbo",
          max_tokens: 700,
          n: 1,
          temperature: 0.25,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (err) {
      console.log(err);
    }
  };

  const NEWOpenAIFinalProcessing = async (SEARCH_TERM) => {
   
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: [
            {
              role: "user",
              content: `You are a machine that is built to respond to prompts using strictly JSON format. No additional text is to be included in your response. I am going to provide you with a cooking instructions. You need to reply with a JSON object using the following schema:

              {
                name:"the title of the recipe formatted as a String",
                description:"a brief one sentence description of the recipe formatted as a string",
                serves:"the mode number of servings that this recipe will provide formatted as an int",
                cooktime:"the estimated total time in minutes for this recipe to be cooked formatted as an int",
                ingredients:[{'ingedient':'name of ingredient 1 , 'amount': 'quantity of ingredient 1 for the recipe'},{'ingedient':'name of ingredient 2 , 'amount': 'quantity of ingredient 2 for the recipe' }],
                steps:[{body:"a very brief and concise explanation for step 1 of the recipe"},{body:"a very brief and concise explanation for step 2 of the recipe"}]
                }
          note: the steps and ingredients properties, will be an array that covers all necessary ingredients and instructions for the recipe.
          
          Now provide me a JSON object for ${SEARCH_TERM}`,
            },
          ],
          model: "gpt-3.5-turbo",
          max_tokens: 600,
          n: 1,
          temperature: 0.55,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes["recipe-input-container"]}>
      {isLoading && <Modal> <p>loading, please be patient...</p></Modal>}
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
