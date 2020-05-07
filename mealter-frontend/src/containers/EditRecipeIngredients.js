import React, {useEffect, useState} from 'react'
import {backEndUrl} from '../constants'

const EditRecipeIngredients = () => {

  const [ingredients, changeIngredients] = useState([])
  const [filter, changeFilter] = useState(null)

  useEffect(() => {
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/measurments`,{
        method: "GET",
        headers:{Authorization: `Bearer ${localStorage.token}`}
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => changeIngredients(backend))
        .catch(console.log)
    }
    return undefined
  }, [])

  const allUnits = () => {
    if (ingredients.length === 0){
     return [] 
    }
    else{
      let units = ingredients.map(i => i.unit)
      return units.filter((unit, index) => units.indexOf(unit) === index).sort((a,b) => a < b ? -1 : 1)
    }
  }


  const renderUnit = (unit) => {
    return (
      <div onClick = {handleClick} id = {unit} key = {unit.id} className="listItem inline-block doneStep">
        {unit}
      </div>
    )
  }

  const handleClick = (e) => {
    if (e.target.className === "listItem inline-block doneStep"){
      changeFilter(e.target.id)
      e.target.className = "listItem inline-block active"
    }
    else {
      changeFilter(null)
      e.target.className = "listItem inline-block doneStep"
    }
  }

  const filterIngreds = () => filter ? ingredients.filter(i => i.unit === filter) : ingredients.slice(0, 20)

  const renderIngred = (ingred) => {
    return(
        <tr id = {ingred.id}>
            <td>{ingred.ingredient}</td>
            <td ><input id = {ingred.id + "value"} placeholder ={ingred.quantity}></input></td>
            <td id = {ingred.id + "recipe"}>
              <a href = {`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ingred.recipe_id}`} target="_blank" rel="noopener noreferrer" >{ingred.recipe_id}</a>
            </td>
            <td>
              <select id = {ingred.id + "unit"}>
                {allUnits().map(u => <option selected={u === ingred.unit ? "selected" : null} value={u}>{u}</option>)}
              </select>
            </td>
            <td><button onClick = {() => editElement(ingred.id)}>Edit</button></td>
        </tr>

    )
  }

  const editElement = (id) => {
    let quantity = document.getElementById(id + "value").value
    if (!quantity){
      quantity = document.getElementById(id + "value").placeholder
    }
    let unit = document.getElementById(id + "unit").value
    fetch(`${backEndUrl}/api/v1/measurments`,{
      method: "PATCH",
      headers:{
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        quantity: quantity,
        unit: unit
      })
    })
      .then(resp => resp.ok ? resp.json() : throwError(resp.status))
      .catch(console.log)
  }

  return(
    <div>
      <h1 className ="bigtext">
        Ingredients
      </h1>
      <div>
        {allUnits().map(unit => renderUnit(unit))}
      </div>
      <table>
        <tbody>
          {filterIngreds().map(ingred => renderIngred(ingred))}
        </tbody>
      </table>
    </div>
  )
}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}

export default EditRecipeIngredients