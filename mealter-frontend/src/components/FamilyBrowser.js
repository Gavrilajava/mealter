import React, {useEffect, useState} from 'react'
import FamilyMember from './FamilyMember'
import {backEndUrl} from '../constants'
import Tags from './Tags'

const FamilyBrowser = () => {

  const [family, setFamily] = useState([])
  const [tags, setTags] = useState([])
  const [showTags, changeShowTags] = useState(false)
  const [activeTag, setActiveTag] = useState(false)

  useEffect(() => {
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/family`,{
        method: "GET",
        headers:{Authorization: `Bearer ${localStorage.token}`}
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => {
          setTags(backend.tags)
          setFamily(backend.family)
        })
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


  


  return(
    <div className = "browser">
      {showTags? <Tags tags={tags} activeTag = {activeTag} setActiveTag = {setActiveTag}/> : null}
      {family.map((member) => <FamilyMember key = {member.id} family={family} editFamily = {setFamily} member_id = {member.id} showTags ={showTags} changeShowTags = {changeShowTags} activeTag = {activeTag}/>)}
      <button id ="addMember" onClick = {addMember} >Add Member</button>
    </div>
  )
}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}




export default FamilyBrowser