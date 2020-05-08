import React, {useRef, useState} from 'react'
import RecipeCard from '../components/RecipeCard'
import FilterField from '../components/FilterField'
import useFetch from '../containers/common/useFetch'
import ErrorMessage from '../containers/common/ErrorMessage'
import Loading from '../containers/common/Loading'


const Recipes = () => {


    const [recipes, changeRecipes] = useState([])
    const [filter, changeFilter] = useState("")
    const stillMounted = useRef(true)

    const {isLoading, fetchError} = useFetch(stillMounted, "recipes", changeRecipes)

    const keywords = (recipe) => [...recipe.tags, recipe.name, recipe.category].join(" ").toLowerCase()
  
    const filterRecipes = () => filter.length === 0 ? recipes : recipes.filter(r => keywords(r).includes(filter))
  
  
    return(
      <div className="centered">
        <FilterField changeFilter = {changeFilter}/>
        {isLoading
        ? <Loading/>
        : filterRecipes().map(recipe => <RecipeCard key = {recipe.id} recipe = {recipe}/>)}
        {fetchError? <ErrorMessage error = {fetchError}/> : null}
      </div>
    )
  

}

export default Recipes

