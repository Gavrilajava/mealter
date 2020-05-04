
import {backEndUrl} from '../constants'

const AddToSchedule = (id) => {
  if (localStorage.token){
    fetch(`${backEndUrl}/api/v1/scheduled/`,{
      method: "POST",
      headers:{
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipe_id: id,
        date: null,
        cooked: false,
        ingredients_bought: false
      })
    })
      .then(resp => resp.ok ? resp.json() : throwError(resp.status))
      .then(resp => console.log(resp))
      .catch(console.log)
  }
}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}

export default AddToSchedule