import RecipeInputContainer from "./RecipeInputContainer"
import PresetList from "./Presets/PresetList"
const HomeScreen = (props) =>{

    const pull_data = (data) => {
      
        props.pull_data(data)
      }

    return (
        <div className="home-container">
        <h1 className="h1-title">Get the recipes, not the life story</h1>
        <RecipeInputContainer handleRecipe={pull_data} />
        <h2>Or use a preset</h2>
        <PresetList />

        </div>
    )
}

export default HomeScreen