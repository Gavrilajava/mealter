import React, {useEffect, useState} from 'react'
import FamilyMember from './FamilyMember'
import {connect} from 'react-redux'
import {backEndUrl} from '../constants'

const FamilyBrowser = (props) => {

  const [family, setFamily] = useState([])

  useEffect(() => {
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/family`,{
        method: "GET",
        headers:{Authorization: `Bearer ${localStorage.token}`}
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => setFamily(backend.family))
        .catch(console.log)
    }
    return undefined
  }, [])

  const addMember = () => {
    let newMember = {
      name: "Insert Name",
      userpic: "/avatar-placeholder.png"
    }
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/family`,{
        method: "POST",
        headers:{
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({member: newMember})
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => {


          setFamily(backend.family)
          
        })
        .catch(console.log)
    }
    return undefined
  }


  
  const addButton = () => {
    return(
      <div className = "container">
        <div onClick = {addMember} className =  "btnHolder">
        <i class="far fa-plus-square"></i>
        </div>
      </div>
    )
  }


  return(
    <div className = "browser">
      {family.map((member) => <FamilyMember family={family} editFamily = {setFamily} member_id = {member.id}/>)}
      {addButton()}
    </div>
  )
}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}




export default FamilyBrowser