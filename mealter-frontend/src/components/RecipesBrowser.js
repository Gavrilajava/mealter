import React, {useEffect, useState} from 'react'
import RecipeCard from './RecipeCard'
import {backEndUrl} from '../constants'

const RecipesBrowser = () => {

  const [state, changeState] = useState({recipes: [], filter: null})

  useEffect(() => {
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/recipes`,{
        method: "GET",
        headers:{Authorization: `Bearer ${localStorage.token}`}
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => changeState({...state, recipes: backend}))
        .catch(console.log)
    }
    return undefined
  }, [])



  const changeFilter = (e) => {
    changeState({...state, filter: e.target.value})
  }

  const FilterField = () => {
    return (
      <div>
        <input onChange = {changeFilter} value = {state.filter}></input>
      </div>
    )
  }

  return(
    <div>
      <FilterField/>
      {state.recipes.map(recipe => <RecipeCard key = {recipe.id} recipe = {recipe}/>)}
    </div>
  )

}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}

export default RecipesBrowser