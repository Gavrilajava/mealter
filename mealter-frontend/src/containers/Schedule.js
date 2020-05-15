import React, {useState} from 'react'
import {backEndUrl} from '../constants'
import fontSizeFromTitle from '../components/fontSizeFromTitle'

const Schedule = () => {

  const [recipes, changeRecipes] = useState([])
  const [activeRecipe, setActive] = useState(false)

  const setTime = (e) => {
    if (activeRecipe && e.target.tagName === "TD" && !e.target.id.includes("Time")){
      if (localStorage.token){
        fetch(`${backEndUrl}/api/v1/scheduled`,{
          method: "PATCH",
          headers:{
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...recipes.find(recipe => recipe.id === activeRecipe),
            date: new Date(Date.parse(e.target.id)).toString()
          })
        })
          .then(resp => resp.ok ? resp.json() : throwError(resp.status))
          .catch(console.log)
      }
      changeRecipes([
        ...recipes.filter(recipe => recipe.id !== activeRecipe),
        {...recipes.find(recipe => recipe.id === activeRecipe),
          date: new Date(Date.parse(e.target.id)).toString()
        }]
      )
    }
    console.log(e.target)
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

  const deleteRecipe = (e) => {
    let id = e.target.id
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/scheduled/${id}`,{
        method: "DELETE",
        headers:{Authorization: `Bearer ${localStorage.token}`}
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .catch(console.log)
    }
    changeRecipes(recipes.filter(recipe => recipe.id !== id))
  }


  const changeActive = (e) => {
    if (e.target.id === activeRecipe){
      setActive(false)
    }
    else(
      setActive(parseInt(e.target.id))
    )
  }
  

  const renderRecipe = (recipe) => {
    let className
    let style
    if (recipe.id === activeRecipe){
      className = "smallCard active"
      style= {boxShadow: "6px 6px 12px black", backgroundImage: 'url(' + recipe.picture + ')'}
    }
    else{
      className = "smallCard"
      style= {backgroundImage: 'url(' + recipe.picture + ')'}
    }
    return(
      <div 
        id = {recipe.id} 
        onClick = {changeActive} 
        className = {className} 
        style = {style}
        >
        <a
          href = {`/recipes/${recipe.recipe_id}`} 
          id = {recipe.id} 
          style={{fontSize: fontSizeFromTitle(recipe.name, 50, 170, 1.25, 8)}} 
        >
          {recipe.name}
        </a>
        <div onClick = {deleteRecipe} className = "fmIcom fmDelete deleteIcon"><i className="far fa-trash-alt"></i></div>
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
    if (id.includes("Time")){
      return(
        <td className = "rowHeader" id= {id}>
          {data}
        </td>
      )
    }
    else {
    return (
      <td className = "cell" onClick = {setTime} id= {id}>
        {data}
        {isRecipe(id)}
      </td>
    )
    }
  }

 

  const renderTable = () => {
    let columns = [["Time", "8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"]]
    for (let i = 0; i < 7; i++) {
      columns.push([])
      columns[i+1].push(new Date((Date.now() + (60*60*24*1000*i))).toLocaleDateString())
    }
    return(
      <table className= "schedule">
        <thead>
          {renderHeaders(columns)}
        </thead>
        <tbody>
            {columns[0].map((time, index) => index ===0 ? null : renderRow(columns, index, time))}
        </tbody>
      </table>
    )
  }

  return(
    <div className="centered">
      <h1 className ="title">
        This is Your Coocking Schedule:
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