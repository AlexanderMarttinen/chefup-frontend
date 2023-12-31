import './App.css';
import React from 'react';
import Account from './components/AccountScreen/Account';
import Saved from './components/savedRecipes/Saved';
import ScreenRecipe from './components/screenRecipe/Recipe';
import {Routes,Route,HashRouter} from 'react-router-dom'
import HomeScreen from './components/homeScreen/HomeScreen';
import NavBar from './components/UI/NavBar';

import UserProvider from './store/UserProvider';
function App() {
  return (
    <div className="App">
      
      <HashRouter>
      <UserProvider>
      <NavBar />
      <Routes>
        <Route path ='/' element={<HomeScreen />} />
        <Route path ='recipe/' > 
          <Route path =':id' element={<ScreenRecipe />} /> 
        </Route>
        
        <Route path ='/saved' element={<Saved />} />
        <Route path ='/account' element={<Account />} />


   
      </Routes>
      </UserProvider>
      </HashRouter>
     
    </div>
  );
}

export default App;

