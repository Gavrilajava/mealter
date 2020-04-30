import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './containers/common/Header'
import Home from './containers/Home'
import Recipes from './containers/Recipes'
import Family from './containers/Family'
import Schedule from './containers/Schedule'
import Grocery from './containers/Grocery'
import About from './containers/About'
import RecipePage from './containers/RecipePage'
import EditRecipeIngredients from './containers/EditRecipeIngredients'

function App() {
  return (
    <BrowserRouter>
     <div>
      <Header/>
      <Switch>

        <Route exact path="/" render={(routerProps) => <Home {...routerProps} /> }/>
        <Route exact path="/recipes" render={(routerProps) => <Recipes {...routerProps} /> }/>
        <Route exact path="/family" render={(routerProps) => <Family {...routerProps} /> }/>
        <Route exact path="/schedule" render={(routerProps) => <Schedule {...routerProps} /> }/>
        <Route exact path="/grocery" render={(routerProps) => <Grocery {...routerProps} /> }/>
        <Route exact path="/about" render={(routerProps) => <About {...routerProps} /> }/>
        <Route exact path="/edit" render={(routerProps) => <EditRecipeIngredients {...routerProps} /> }/>
        <Route exact path="/recipe/:id" render={(routerProps) => <RecipePage {...routerProps} /> }/>
        

        {/* <Route path="/paintings/:id" component={PaintingInfo}/>  */}
      
      </Switch>
 
    </div>
    </BrowserRouter>
  );
}

export default App;

