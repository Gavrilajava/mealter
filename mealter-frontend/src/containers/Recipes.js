import React, {useEffect, useState} from 'react'
import RecipeCard from '../components/RecipeCard'
import {backEndUrl} from '../constants'
import FilterField from '../components/FilterField'

const Recipes = () => {
    // const [state, changeState] = useState({recipes: [], filter: null})

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
          // .then(backend => changeState({...state, recipes: backend}))
          .catch(console.log)
      }
      return undefined
    }, [])
  
  
  
    // const changeFilter = (e) => {
    //   changeState({...state, filter: e.target.value})
    // }
  
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

export default Recipes

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}