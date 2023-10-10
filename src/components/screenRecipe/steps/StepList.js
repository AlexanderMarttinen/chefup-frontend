import classes from './Step.module.css'
import Step from './Step';
const StepList = (props) =>{

    const DUMMY_STEPS = [
      {
        body: "If using frozen shrimp, place them in a colander and run cool water over top to thaw (this should only take a few minutes). Peel the shrimp and remove the tails. Pat the shrimp dry with a paper towel."
      },
      {
        body: "Bring a large pot of water to a boil for the pasta. Once boiling, add the pasta and continue to boil until the pasta is tender (about seven minutes). Reserve about ½ cup of the starchy pasta water before draining the pasta in a colander."
      },
      {
        body: "While the pasta is cooking, prepare the rest of the dish. Heat 1 Tbsp olive oil in a large skillet. Once hot, add the prepared shrimp and sauté just until the shrimp turns pink and opaque (2-3 minutes). Remove the cooked shrimp to a clean bowl."
      },
      {
        body: "Add another tablespoon olive oil to the skillet and add the grape tomatoes and minced garlic. Continue to sauté over medium until the tomatoes begin to burst and release their juices. If the garlic begins to brown before the tomatoes have burst, add a couple tablespoons of water to the skillet to slow the browning."
      },
      {
        body: "Once the tomatoes have broken down in the skillet, add the cooked and drained pasta, ¼ cup pesto, and about half of the reserved pasta water. Stir to coat everything in the pesto, adding more of the pasta water if needed to loosen the pasta and spread the pesto over everything."
      },
      {
        body: "Finally, return the cooked shrimp to the skillet and stir to combine with the pasta. Top with grated Parmesan, then serve!"
      }
    ]

    return(
        <div className={classes.stepList}>
            {props.steps.map((step,i) => (
          <Step {...step} id={i+1} key={i} />
        ))}
        </div>
    )
}

export default StepList 