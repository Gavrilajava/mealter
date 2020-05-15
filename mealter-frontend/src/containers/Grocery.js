import React, {useEffect, useState} from 'react'
import {backEndUrl} from '../constants'
import fontSizeFromTitle from '../components/fontSizeFromTitle'

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
    if (localStorage.token){
      // e.target.className = "groceryItem flyAway"
      fetch(`${backEndUrl}/api/v1/grocery`,{
        method: "POST",
        headers:{
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ingredient: e.target.id
        })
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => setGrocery(backend))
        .catch(console.log)
    }
  }

  const uncheckItem = (e) => {
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/grocery`,{
        method: "DELETE",
        headers:{
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ingredient: e.target.id
        })
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => setGrocery(backend))
        .catch(console.log)
    }
  }

  const replaceAll = (string, str1, str2) => string.split(str1).join(str2)


  const displayItem = (item) => {
    return (
      <div id = {item} onClick = {checkItem} className = "groceryItem" style={{backgroundImage: 'url(https://www.themealdb.com/images/ingredients/' + replaceAll(item, " ", "%20") + '.png)'}}>
        <p id = {item} className = "groceryName" style={{fontSize: fontSizeFromTitle(item, 60, 200, 1.2, 8)}}  >{item}</p>
        <p id = {item} className = "groceryQuantity">{Object.keys(grocery.shopping_list[item]).map(unit => `${grocery.shopping_list[item][unit]} ${unit}`).join(" + ")}</p>
      </div>
    )
  }

  const displayBought = (item) => {
    return (
      <div onClick = {uncheckItem} key = {item}  id = {item} className = "groceryItem small" style={{backgroundImage: 'url(https://www.themealdb.com/images/ingredients/' + replaceAll(item, " ", "%20") + '.png)'}}>
        <p id = {item} className = "groceryName smalltext" style={{fontSize: fontSizeFromTitle(item, 36, 120, 1.4, 8)}} >{item}</p>
        <p id = {item} className = "groceryQuantity smalltext">{Object.keys(grocery.stock[item]).map(unit => `${grocery.stock[item][unit]} ${unit}`).join(" + ")}</p>
      </div>
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
       {Object.keys(grocery).length === 0 ? noGroceryDisclaimer() : Object.keys(grocery.shopping_list).map(key => displayItem(key))}
      </div>
      <h1 className ="title">
        This items you already have:
      </h1>
      <div className = "grocery">
       {Object.keys(grocery).length === 0 ? noGroceryDisclaimer() : Object.keys(grocery.stock).map(key => displayBought(key))}
      </div>

    </div>
  )
}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}

export default Grocery