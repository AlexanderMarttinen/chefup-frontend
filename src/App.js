import './App.css';

import React from 'react';

import Home from './components/homeScreen/Home';
import Account from './components/acountScreen/Account';
import Saved from './components/savedRecipes/Saved';
import ScreenRecipe from './components/screenRecipe/Recipe';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path ='/' element={<Home />} />
        <Route path ='/recipe/' element={<ScreenRecipe />} />
        <Route path ='/saved' element={<Saved />} />
        <Route path ='/account' element={<Account />} />


   
      </Routes>
      
      </BrowserRouter>
     
    </div>
  );
}

export default App;

