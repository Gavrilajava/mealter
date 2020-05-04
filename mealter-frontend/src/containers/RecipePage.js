import React, {useEffect, useState} from 'react'
import {backEndUrl} from '../constants'
import AddToSchedule from '../components/AddToSchedule'

const RecipePage = (props) => {

  // props.match.params.id
  const [recipe, changeRecipe] = useState(false)

 
  useEffect(() => {
    fetch(`${backEndUrl}/api/v1/recipe/${props.match.params.id}`,{
      method: "GET",
      // headers:{Authorization: `Bearer ${localStorage.token}`}
    })
      .then(resp => resp.ok ? resp.json() : throwError(resp.status))
      .then(backend => changeRecipe(backend))
      .catch(console.log)
    return undefined
  }, [])



  const makeDone = (e) => {
    if (e.target.className == "doneStep listItem"){
      e.target.className = "recipeStep listItem"
    }
    else{
      e.target.className = "doneStep listItem"
    }
  }

  const renderStep = (step) => {
    return(
      <li className="recipeStep listItem" onClick = {makeDone}>
        {step}
      </li>
    )
  }

  const renderIng = (ing) => {
    return (
      <li className="ingredient listItem"> 
        <img className = "ingIcon" src = {ing.picture} alt = {ing.description}></img>
        {`${ing.name} - ${ing.quantity} ${ing.unit}`}
      </li>
    )
  }

  const toEmbed = (link) => {
    let video_id = link.slice(link.indexOf('v=') + 2)
    return `https://www.youtube.com/embed/${video_id}`
  }



  if (recipe){
    return(
      <div className="centered">
        <h1 className ="bigtext">
          {recipe.name}
        </h1>
        <button onClick = {() => AddToSchedule(props.match.params.id)} >Add to Schedule</button>
        <img className = "recipeImage" src = {recipe.picture} alt = {recipe.name}></img>
        <ul className="grocerylist">{recipe.ingredients.map(ing => renderIng(ing))}</ul>
        <iframe width="560" height="315" src={toEmbed(recipe.video)} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <ol className="recipedesctiption">{recipe.instructions.split(". ").map(step => renderStep(step))}</ol>
      </div>
    )
  }
  else {
    return null
  }






}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}

export default RecipePage

