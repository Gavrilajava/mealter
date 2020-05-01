import React from 'react'
import AddToSchedule from '../components/AddToSchedule'


const RecipeCard = (props) => {

  const wordSize = (word) => {
    const irregular ={
      "i": 0.5,
      'l': 0.5,
      'r': 0.8,
      'm': 1.2,
      'M': 1.2
    }

    let result = word.split("").reduce((size, letter) => {
      if (irregular[letter]){
        size = size + irregular[letter]
        return size
      }
      else{
        size++
        return size
      }
    }, 0)
    return result
  }

  const countLines = (title, lfactor) => Math.round(title.split('').length/(title.split(' ').length + lfactor))

  const maxWordSize = (title) => title.split(" ").reduce((max, word) => wordSize(word) > max ? max = wordSize(word) : max , 0)

  const fontSizeFromTitle = (title) => { 
    // constants depending on font
    const sfactor = 36
    const cfactor = 0.2
    const lfactor = 1.8
    let maxFromWordsSize = Math.round(((sfactor / maxWordSize(title)) - cfactor)*10)/10
    let maxFromLinesCount = Math.round(15 * 10 /countLines(title, lfactor))/10
    return `${Math.min(maxFromWordsSize, maxFromLinesCount)}em`
  }





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
