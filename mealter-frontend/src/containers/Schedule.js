import React, {useEffect, useState} from 'react'
import {backEndUrl} from '../constants'

const Schedule = () => {

  const [recipes, changeRecipes] = useState([])
  const [activeRecipe, setActive] = useState(false)

  const setTime = (e) => {
    if (activeRecipe && !e.target.id.includes("Time")){
      if (localStorage.token){
        fetch(`${backEndUrl}/api/v1/scheduled`,{
          method: "PATCH",
          headers:{
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...recipes.find(recipe => recipe.id == activeRecipe),
            date: new Date(Date.parse(e.target.id)).toString()
          })
        })
          .then(resp => resp.ok ? resp.json() : throwError(resp.status))
          .catch(console.log)
      }
      changeRecipes([
        ...recipes.filter(recipe => recipe.id !== activeRecipe),
        {...recipes.find(recipe => recipe.id == activeRecipe),
          date: new Date(Date.parse(e.target.id)).toString()
        }]
      )
    }
  }

 
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/scheduled`,{
        method: "GET",
        headers:{Authorization: `Bearer ${localStorage.token}`}
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => {
          if (JSON.stringify(backend) !== JSON.stringify(recipes)){
            changeRecipes(backend)
          }
          
        })
        .catch(console.log)
    }



  const changeActive = (e) => {
    if (e.target.id === activeRecipe){
      setActive(false)
    }
    else(
      setActive(e.target.id)
    )
  }
  

  const renderRecipe = (recipe) => {
    return(
      <div id = {recipe.id} onClick = {changeActive} className = {recipe.id == activeRecipe? "smallCard active" : "smallCard"}>
        <img src = {recipe.picture} alt = {recipe.name} className = "smallImg"></img>
        <label>{recipe.name}</label>
      </div>
    )
  }

  const renderHeader = (d) => <th>{d}</th>

  const renderHeaders = (columns) => {
    return(
      <tr>
        {columns.map(column => renderHeader(column[0]))}
      </tr>
    )
  }

  const renderRow = (columns, index, time) => {

    return(
      <tr>
        {columns.map(column => renderCell(column[index], column[0] + " " + time))}
      </tr>
    )
  }

  const isRecipe = (time) => {
    if (!time.includes("Time")){
      let r = recipes.find(recipe => new Date(Date.parse(recipe.date)).toString() === new Date(Date.parse(time)).toString())
      if (r) {
        return renderRecipe(r)
      }
      else{
        return null
      }
    }
    else{
      return null
    }
  }

  const renderCell = (data, id) => {
    return (
      <td onClick = {setTime} id= {id}>
        {data}
        {isRecipe(id)}
      </td>
    )
  }

 

  const renderTable = () => {
    let columns = [["Time", "8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"]]
    for (let i = 0; i < 7; i++) {
      columns.push([])
      columns[i+1].push(new Date((Date.now() + (60*60*24*1000*i))).toLocaleDateString())
    }
    return(
      <table>
            {columns[0].map((time, index) => index ===0 ? renderHeaders(columns) : renderRow(columns, index, time))}
      </table>
    )
  }

  return(
    <div>
      <h1 className ="bigtext">
        This is Schedule Page
      </h1>
      <div>
        {recipes.filter(recipe => recipe.date === null).map(recipe => renderRecipe(recipe))}
      </div>
      {renderTable()}
    </div>
  )
}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}

export default Schedule