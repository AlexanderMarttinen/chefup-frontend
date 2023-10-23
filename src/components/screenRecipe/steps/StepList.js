import classes from './Step.module.css'
import Step from './Step';
const StepList = (props) =>{

    return(
        <div className={classes.stepList}>
            {props.steps.map((step,i) => (
          <Step {...step} id={i+1} key={i} />
        ))}
        </div>
    )
}

export default StepList 