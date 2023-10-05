import React, { Fragment } from "react";
import ImgSoufle from "../../../assets/presets/soufle.jpg";
import ImgPasta from '../../../assets/presets/preset_pasta.jpg'
import PresetRecipe from "./PresetRecipe";

const PresetList = () => {
  const PRESETS = [
    {
      body: `Jacques Pépin's soufflé is a casserole-style dish that puffs up quite
        nicely and has a rich cheesy-eggy flavor from the Gruyère cheese.`,
      title: `Maman's Cheese Soufflé`,
      linkDisplay: `foodandwine.com`,
      link: `https://www.foodandwine.com/recipes/aspen-2003-mamans-cheese-souffle`,
    },
    {
      body: `This Pesto Shrimp Pasta is a restaurant quality meal that you can make in under 30 minutes! The perfect quick weeknight meal.`,
      title: `Pesto Shrimp Pasta`,
      linkDisplay: `budgetbytes.com`,
      link: `https://www.budgetbytes.com/pesto-shrimp-pasta/`,
    },
  ];
  return (
    <>
      <PresetRecipe src={ImgSoufle} {...PRESETS[0]} />
      <PresetRecipe src={ImgPasta} {...PRESETS[1]} />
    </>
  );
};

export default PresetList;
