import React, {useEffect, useState} from 'react'
import {backEndUrl} from '../constants'
import AddToSchedule from '../components/AddToSchedule'
import Timer from '../components/Timer'

const RecipePage = (props) => {

  // props.match.params.id
  const [recipe, changeRecipe] = useState(false)
  const [showSteps, changeShow] = useState(false)
  const [currentStep, changeStep] = useState(0)
  const [expand, changeExpand] = useState(false)

 
  useEffect(() => {
    fetch(`${backEndUrl}/api/v1/recipe/${props.match.params.id}`,{
      method: "GET",
    })
      .then(resp => resp.ok ? resp.json() : throwError(resp.status))
      .then(backend => changeRecipe(backend))
      .catch(console.log)
    return undefined
  }, [])



  const timerSeconds = (step) => parseInt(step.split(" minutes")[0].split(/[^0-9]/g).pop())*60

  

  const renderStep = (step, index) => {
    if ((index > (currentStep -1)) && (expand || ( index < (currentStep + 3))))  {
      return(
        <div className = "recipeStep" >
          <label className = "recipeStepLabel">STEP {index+1}:</label>
          {step.includes("minutes") ? <Timer time = {timerSeconds(step)}/> : null}
          <p>{step}</p>
          {currentStep === index ? <button id="stepDone" onClick = {() => changeStep(index +1)}>Done</button> : null}
          
        </div>
      )
    }
    else{
      if (index === (currentStep - 1)){
        return(
          <button id="stepBack" onClick = {() => changeStep(index -1)}>Step back</button>
        )
      }
      else{
        return null
      }
    }
  }

  const renderIng = (ing) => {
    return (
      <div key = {ing.name} className = "groceryItem small" style={{backgroundImage: `url(${ing.picture})`}}>
        <p className = "groceryName smalltext">{ing.name}</p>
        <p className = "groceryQuantity smalltext">{`${ing.quantity} ${ing.unit}`}</p>
      </div>
    )
  }

  const toEmbed = (link) => {
    let video_id = link.slice(link.indexOf('v=') + 2)
    return `https://www.youtube.com/embed/${video_id}`
  }

  const stepsOrIngreds = () => {
    if (showSteps){
      return (
        <div className="recipedesctiption"> 
          {recipe.instructions.split(". ").map((step, index) => renderStep(step, index))} 
          {(expand)
          ? <button onClick = {()=> changeExpand(false)}>Collapse</button>
          : <button onClick = {()=> changeExpand(true)}>Expand All</button>}
        </div>
      )
    }
    else {
      return (
        recipe.ingredients.map(ing => renderIng(ing))
      )
    }

  }


  if (recipe){
    return(
      <div className="centered">
        <h1 className ="title">
          {recipe.name}
        </h1>
        <button id = "add_to_schedule" onClick = {() => AddToSchedule(props.match.params.id)} >Add to Schedule</button>
        <button id = "change_view" onClick = {() => changeShow(!showSteps)}>{showSteps?"Show Ingredients":"Show steps"}</button>
        <iframe 
          width="853" 
          height="505" 
          src={toEmbed(recipe.video)} 
          frameBorder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
        {stepsOrIngreds()} 
      </div>
    )
  }
  else {
    return null
  }






}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}

export default RecipePage

