import React, {useEffect, useState} from 'react'
import {backEndUrl} from '../constants'

const Grocery = () => {

  const [grocery, setGrocery] = useState({})

  useEffect(() => {
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/grocery`,{
        method: "GET",
        headers:{Authorization: `Bearer ${localStorage.token}`}
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => setGrocery(backend))
        .catch(console.log)
    }
    return undefined
  }, [])


  const checkItem = (e) => {
    if (e.target.className === "listItem checklist"){
      e.target.className = "listItem doneStep"
    }
    else {
      e.target.className = "listItem checklist"
    }
    return undefined
  }

  const displayItem = (item) => {
    return (
      <li onClick = {checkItem} className="listItem checklist">
        {item+" - " + Object.keys(grocery[item]).map(unit => `${grocery[item][unit]} ${unit}`).join(" + ")}
      </li>
    )
  }

  const noGroceryDisclaimer = () => {
    return (
      <div>
        Add some recipes to your scedule, to get grocery list
      </div>
    )
  }

  return(
    <div>
      <h1 className ="bigtext">
        This is Grocery Page
      </h1>
      <ul>
        {Object.keys(grocery).length === 0 ? noGroceryDisclaimer() : Object.keys(grocery).map(key => displayItem(key))}
      </ul>
    </div>
  )
}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}

export default Grocery