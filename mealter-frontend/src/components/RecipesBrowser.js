import React, {useEffect, useState} from 'react'
import RecipeCard from './RecipeCard'
import {backEndUrl} from '../constants'
import FilterField from './FilterField'

const RecipesBrowser = () => {

  const [recipes, changeRecipes] = useState([])
  const [filter, changeFilter] = useState("")

  useEffect(() => {
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/recipes`,{
        method: "GET",
        headers:{Authorization: `Bearer ${localStorage.token}`}
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => changeRecipes(backend))
        .catch(console.log)
    }
    return undefined
  }, [])

  const filterRecipes = () => {
    if (filter.length === 0){
      return recipes
    }
    else {
      return recipes.filter(r => r.name.toLowerCase().includes(filter.toLowerCase()) || r.category.toLowerCase().includes(filter.toLowerCase()) || r.tags.join("").toLowerCase().includes(filter))
    }
  }

  return(
    <div className= "wrapper">
      <FilterField changeFilter = {changeFilter}/>
      {filterRecipes().map(recipe => <RecipeCard key = {recipe.id} recipe = {recipe}/>)}
    </div>
  )

}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}

export default RecipesBrowser