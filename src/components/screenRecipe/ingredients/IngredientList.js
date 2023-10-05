import classes from './Ingredient.module.css'
import Ingredient from './Ingredient';
const IngredientList = () =>{

    const DUMMY_INGREDIENTS = [
        {
          name: "shrimp, peeled and deveined",
          amount: "12oz.",
        },
        {
          name: "angel hair pasta",
          amount: "8oz.",
        },
        {
          name: "olive oil, divided",
          amount: "2 Tbsp",
        },
        {
          name: "garlic, minced",
          amount: "2 cloves",
        },
        {
          name: "grape tomatoes",
          amount: "1 pint",
        },
        {
          name: "basil pesto",
          amount: "1/4 cup",
        },
        {
          name: "grated Parmesan",
          amount: "1 Tbsp",
        },
      ];

    return(
        <div className={classes.stepList}>
            {DUMMY_INGREDIENTS.map((ingredient,i) => (
          <Ingredient {...ingredient} id={i} />
        ))}
        </div>
    )
}

export default IngredientList 