import logo from './logo.svg';
import './App.css';
import HomeScreen from './components/homeScreen/HomeScreen';
import ScreenRecipe from './components/screenRecipe/ScreenRecipe';

function App() {
  return (
    <div className="App">
      {/* <HomeScreen/> */}
      <ScreenRecipe />
    </div>
  );
}

export default App;
