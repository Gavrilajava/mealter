import React from 'react'
import AddToSchedule from '../components/AddToSchedule'


const RecipeCard = (props) => {


  // return(
  //   <div  className = "container">
  //   <div className = "imgcont">
  //       <a href={`/recipe/${props.recipe.id}`} >
  //         <img alt = "recipe avatar" src = {props.recipe.picture} />
  //       </a>
  //   </div>
  //   <div className = "middle">
  //     <h2> {props.recipe.name} </h2>
  //   </div>
  //   <div className = "description">
  //     <label>Area: {props.recipe.area}</label>
  //     <br></br>
  //     <label>Category: {props.recipe.category}</label>
  //     <br></br>
  //     <label>Tags:</label>
  //     <br></br>
  //     <label>{props.recipe.tags.map(tag => tag).join(", ")}</label>
  //   </div>
  //   <button onClick = {() => AddToSchedule(props.recipe.id)}>Add to schedule</button>
  // </div>
  // )

return(
 
  <div className="food">
    <div className="cover" style={{backgroundImage: 'url(' + props.recipe.picture + ')'}}>
      <label style={{background: styleForCat(props.recipe.category).color, opacity: 0.8}}>
      <i className={styleForCat(props.recipe.category).icon + " recipe_cat"}></i>
        <font>{props.recipe.category}</font>
      </label>
    <a href={`/recipe/${props.recipe.id}`} className="recipe-title">{props.recipe.name} </a>
    </div>
    <div className="info">
      <a onClick = {() => AddToSchedule(props.recipe.id)} href="#" className="recipe" style={{background: styleForCat(props.recipe.category).color}}>
        <font className="recipe_promt">Add to list</font>
        <i class="fas fa-mortar-pestle go_recipe"></i>
        
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
