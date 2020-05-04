import React from 'react'
import AddToSchedule from '../components/AddToSchedule'
import {backEndUrl} from '../constants'
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
        <a onClick = {() => AddToSchedule(props.recipe.id)} href="#" className="recipe" style={{background: styleForCat(props.recipe.category).color}}>
          <font className="recipe_promt">Add to list</font>
          <i className="fas fa-mortar-pestle go_recipe"></i>
          
        </a>
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

    default:
      return({
        icon: "fas fa-utensils",
        color: "darkcyan"
      })

  }

}
