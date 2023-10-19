import './App.css';

import React from 'react';

import Account from './components/acountScreen/Account';
import Saved from './components/savedRecipes/Saved';
import ScreenRecipe from './components/screenRecipe/Recipe';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomeScreen from './components/homeScreen/HomeScreen';
import NavBar from './components/UI/NavBar';

import UserProvider from './store/UserProvider';
function App() {
//<NavBar active='home' userSignedIn={false} savedClassesProps={savedClasses} userSignedIn={userIsSignedIn} />


  return (
    <div className="App">
      
      <BrowserRouter>
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
      </BrowserRouter>
     
    </div>
  );
}

export default App;

