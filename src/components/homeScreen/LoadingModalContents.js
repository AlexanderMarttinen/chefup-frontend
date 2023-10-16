import ImgCheckFilled from "../../assets/icons/icon-check-filled.png"
import ImgLoading from '../../assets/icons/icon-loading.png'
import classes from './LoadingModalContents.module.css'
import Lottie from "lottie-react"
import ImgLoadingLottie from '../../assets/loadingLottie.json'
import React from "react"
const LoadingModalContents = (props) =>{
    return( 
        <div className={classes.loadingContents}>
          <p>Loading Recipe</p>
          <Lottie className={classes.loadingLottie} animationData={ImgLoadingLottie} />
          <div className= {`loadingStage ${props.findRecipe.class}`} >
            <img src={props.findRecipe.class==='stageFound' ? ImgCheckFilled : ImgLoading } width={14} />
            <p className={props.findRecipe.class} >{props.findRecipe.message}</p>
          </div>

          <div className= {`loadingStage ${props.findIngredients.class}`} >
            <img src={props.findIngredients.class==='stageFound' ? ImgCheckFilled : ImgLoading }  width={14} />
            <p className={props.findIngredients.class} >{props.findIngredients.message}</p>
          </div>

          <div className= {`loadingStage ${props.findSteps.class}`} >
            <img src={props.findSteps.class==='stageFound' ? ImgCheckFilled : ImgLoading } width={14} />
            <p>{props.findSteps.message}</p>
          </div>
        </div>
    )
}

export default LoadingModalContents