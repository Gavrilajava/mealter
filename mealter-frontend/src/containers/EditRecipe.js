import React, {useEffect, useState} from 'react'
import {backEndUrl} from '../constants'

const EditRecipe = props => {

  const [recipe, changeRecipe] = useState(false)
 
  useEffect(() => {
    fetch(`${backEndUrl}/api/v1/recipe/${props.match.params.id}`,{
      method: "GET",
    })
      .then(resp => resp.ok ? resp.json() : throwError(resp.status))
      .then(backend => changeRecipe(backend))
      .catch(console.log)
    return undefined
  }, [props.match.params.id])

  debugger

  return(
    <div className="centered">
      <form>

      </form>
    </div>
  )

}

export default EditRecipe

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}