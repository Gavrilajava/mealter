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

  String.prototype.replaceAll = function(str1, str2, ignore) 
  {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
  } 

  const displayItem = (item) => {
    return (
      <div className = "groceryItem" style={{backgroundImage: 'url(https://www.themealdb.com/images/ingredients/' + item.replaceAll(" ", "%20") + '.png)'}}>
        {/* {item+" - " + Object.keys(grocery[item]).map(unit => `${grocery[item][unit]} ${unit}`).join(" + ")} */}
        <p className = "groceryName">{item}</p>
        <p className = "groceryQuantity">{Object.keys(grocery[item]).map(unit => `${grocery[item][unit]} ${unit}`).join(" + ")}</p>
        
      </div>
      // <li onClick = {checkItem} className="listItem checklist">
      //   {item+" - " + Object.keys(grocery[item]).map(unit => `${grocery[item][unit]} ${unit}`).join(" + ")}
      // </li>
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
    <div className="centered">
      <h1 className ="title">
        And Finally, the Grocery List:
      </h1>
      <div className = "grocery">
       {Object.keys(grocery).length === 0 ? noGroceryDisclaimer() : Object.keys(grocery).map(key => displayItem(key))}
      </div>
      {/* <ul>
       
      </ul> */}
    </div>
  )
}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}

export default Grocery