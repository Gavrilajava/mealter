import React from 'react'
import AddToSchedule from '../components/AddToSchedule'


const RecipeCard = (props) => {


  return(
    <div  className = "container">
    <div className = "imgcont">
        <a href={`/recipe/${props.recipe.id}`} >
          <img alt = "recipe avatar" src = {props.recipe.picture} />
        </a>
    </div>
    <div className = "middle">
      <h2> {props.recipe.name} </h2>
    </div>
    <div className = "description">
      <label>Area: {props.recipe.area}</label>
      <br></br>
      <label>Category: {props.recipe.category}</label>
      <br></br>
      <label>Tags:</label>
      <br></br>
      <label>{props.recipe.tags.map(tag => tag).join(", ")}</label>
    </div>
    <button onClick = {() => AddToSchedule(props.recipe.id)}>Add to schedule</button>
  </div>
  )
}

export default RecipeCard