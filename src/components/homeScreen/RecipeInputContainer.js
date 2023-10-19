import classes from "./RecipeInputContainer.module.css";
import Input from "../UI/Input";
import ButtonPrimaryIcon from "../UI/ButtonPrimaryIcon";
import React, { useState, useEffect, useRef } from "react";
import Modal from "../UI/Modal";
import { useNavigate } from "react-router-dom";
import LoadingModalContents from "./LoadingModalContents";
import { supabase } from "../../utils/supabase";
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
  const navigate = useNavigate();

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  const handleRecipeSearchTermChange = (e) => {
    setReceipeSearchTerm(e.target.value);
  };

  const handleRecipe = async (recipeData) => {
    setIsLoading(false);
    const { error } = await supabase.from("recipes").insert({
      name: recipeData.name,
      description: recipeData.description,
      serves: recipeData.serves,
      cook_time: recipeData.cooktime,
      ingredients: recipeData.ingredients,
      steps: recipeData.steps,
    });
    const { data, errorFetching } = await supabase
      .from("recipes")
      .select()
      .eq("name", recipeData.name);
    navigateToRecipe(data[0].id);
  };
  async function navigateToRecipe(id) {
    navigate(`/recipe/${id}`);
  }
  async function generateRecipe() {
    setIsLoading(true);
    if (recipeSearchTerm !== "") {
      try {
        const response = await fetch(
          "https://recipe-api-edge-functions.netlify.app/createRecipe",
          {
            method: "post",
            body: JSON.stringify({
              recipe: recipeSearchTerm,
            }),
          }
        );
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

          setResult((result) => result + decodedChunk); // update state with new chunk

          const ingredientMatches = (decodedChunk.match(/ingredient/g) || [])
            .length;
          const bodyMatches = (decodedChunk.match(/body/g) || []).length;

          if (ingredientMatches > 0) {
            setStageRecipeComplete({
              message: "Found a recipe",
              class: "stageFound",
            });
            setStageIngredientsComplete({
              message: "Listing Ingredients",
              class: "stageFinding",
            });
          }

          if (bodyMatches > 0) {
            setStageIngredientsComplete({
              message: "Finished Listing Ingredients",
              class: "stageFound",
            });
            setStageStepsComplete({
              message: "Writing instructions",
              class: "stageFinding",
            });
          }
        }
        const jsonResponse = JSON.parse(resultRef.current);
        handleRecipe(jsonResponse);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  }
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
