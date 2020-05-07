import React from 'react'
import AddToSchedule from '../components/AddToSchedule'
import fontSizeFromTitle from './fontSizeFromTitle'

const RecipeCard = (props) => {





  return(
    <div className="food">
      <div className="cover" style={{backgroundImage: 'url(' + props.recipe.picture + ')'}}>
        <label style={{background: styleForCat(props.recipe.category).color, opacity: 0.8}}>
        <i className={styleForCat(props.recipe.category).icon + " recipe_cat"}></i>
          <font className="category">{props.recipe.category}</font>
        </label>
      <a href={`/recipes/${props.recipe.id}`} style={{fontSize: fontSizeFromTitle(props.recipe.name)}}  className="recipe-title">{props.recipe.name} </a>
      </div>
      <div className="info">
        <p onClick = {() => AddToSchedule(props.recipe.id)} className="recipe" style={{background: styleForCat(props.recipe.category).color}}>
          <font className="recipe_promt">Add to list</font>
          <i className="fas fa-mortar-pestle go_recipe"></i>
          
        </p>
        <div className="content">
          <table width="100%" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td align="left" valign="middle" className="pad-right"><strong>Tags:</strong></td>
                <td align="left" valign="middle">{props.recipe.tags.map(tag => tag).join(" ")}</td>
              </tr>
              <tr>
                <td align="left" valign="middle" className="pad-right"><strong>Cuisine:</strong></td>
                <td align="left" valign="middle" className="consumers">
                  <span>{props.recipe.area}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


export default RecipeCard

const styleForCat = (category) => {
  switch(category){
    case "Dessert": 
      return({
        icon: "fas fa-coffee",
        color: "sandybrown"
      })
    case "Beef": 
      return({
        icon: "fas fa-hat-cowboy-side",
        color: "darkslategray"
      })
    case "Vegetarian": 
      return({
        icon: "fas fa-carrot",
        color: "crimson"
      })
      case "Starter": 
      return({
        icon: "fas fa-concierge-bell",
        color: "burlywood"
      })
      case "Miscellaneous": 
      return({
        icon: "fas fa-hamburger",
        color: "blue"
      })
      case "Seafood": 
      return({
        icon: "fas fa-fish",
        color: "slateblue"
      })
      case "Chicken": 
      return({
        icon: "fas fa-drumstick-bite",
        color: "chocolate"
      })
      case "Side": 
      return({
        icon: "fas fa-utensils",
        color: "lightslategray"
      })
      case "Breakfast": 
      return({
        icon: "fas fa-egg",
        color: "orangered"
      })
      case "Pork": 
      return({
        icon: "fas pork",
        color: "fuchsia"
      })
      case "Pasta": 
      return({
        icon: "fas pasta",
        color: "darkkhaki"
      })
      case "Lamb": 
      return({
        icon: "fas lamb",
        color: "yellowgreen"
      })
      case "Goat": 
      return({
        icon: "fas goat",
        color: "mediumspringgreen"
      })
      case "Vegan": 
      return({
        icon: "fas fa-apple-alt",
        color: "steelblue"
      })
    default:
      return({
        icon: "fas fa-utensils",
        color: "silver"
      })

  }

}
