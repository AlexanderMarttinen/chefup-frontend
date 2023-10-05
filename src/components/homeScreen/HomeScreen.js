import RecipeInputContainer from "./RecipeInputContainer"
import PresetList from "./Presets/PresetList"
const HomeScreen = () =>{

    return (
        <div className="home-container">
        <h1 className="h1-title">Get the recipes, not the life story</h1>
        <RecipeInputContainer />
        <h2>Or use a preset</h2>
        <PresetList />

        </div>
    )
}

export default HomeScreen