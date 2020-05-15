import React from 'react'
import {backEndUrl} from '../constants'
import Editable from './Editable'
import fontSizeFromTitle from './fontSizeFromTitle'

const FamilyMember = ({family, member_id, editFamily, activeTag, changeShowTags, showTags}) => {

  let member = family.find(member => member.id === member_id)

  const changeState = (obj) => {
    let new_member = {
      ...member,
      [obj.name]: obj.value
    }
    editFamily(family.filter(m => m.id !== member_id).concat(new_member).sort((a,b) => a.id - b.id))
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/family`,{
        method: "PATCH",
        headers:{
          Authorization: `Bearer ${localStorage.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({member: new_member})
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .catch(console.log)
    }

  }

  const deleteMember = () => {
    if (document.querySelectorAll('textarea').length ===0){
      let newFamily = family.filter(member => member.id !== member_id)
      editFamily(newFamily)
      if (localStorage.token){
        fetch(`${backEndUrl}/api/v1/family`,{
          method: "DELETE",
          headers:{
            Authorization: `Bearer ${localStorage.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({member})
        })
          .then(resp => resp.ok ? resp.json() : throwError(resp.status))
          .catch(console.log)
      }
    }
  }

  const createUrl = (userpic) => {
    if (userpic[0] === '/'){
      return  backEndUrl + userpic
    }
    else {
      return '/images/family/' + userpic + '.jpg'
    }
  }

  const changePicture = () => {
    debugger
    if (document.querySelectorAll('textarea').length ===0){
      if (member.userpic[0] !== '/'){
        let newPic
        if (member.userpic === 'family8'){
          newPic = 'family1'
        }
        else{
          newPic = 'family' + (parseInt(member.userpic.slice(-1))+1)
        }
        changeState({name: "userpic", value: newPic})
      }
    }
    return undefined
  }

  const handlePrioritiesClick = (e) => {
    if (activeTag && e.target.className.includes("tags")){
      changeState({
        name: "tags",
        value: {
          action: "add",
          tag: activeTag,
          direction: e.target.className
        }}
      )
      let newTag = document.createElement("label")
      newTag.className = "tag"
      newTag.innerText = activeTag
      e.target.appendChild(newTag)
    }
    else{
      changeShowTags(!showTags)
    }
  }

  const handleDelete = (e) => {
    debugger
    changeState({
      name: "tags",
      value: {
        action: "remove",
        tag: e.target.parentNode.id,
        direction: e.target.parentNode.className
      }}
    )
    e.target.parentNode.parentNode.removeChild(e.target.parentNode)
  }


  return(
    <div  className = "food">
      <div  className="cover" style={{backgroundImage: 'url(' + createUrl(member.userpic) + ')'}}> 
        <div onClick = {deleteMember} className = "fmIcom fmDelete"><i class="far fa-trash-alt"></i></div>
        <div onClick = {() => changePicture(member)} className = "fmIcom fmChange"><i className="fas fa-arrow-right"></i></div>
        <Editable 
          value = {member.name} 
          name="name" 
          changeParentState={changeState} 
          className="recipe-title" 
          fontSize = {fontSizeFromTitle(member.name)}
        /> 
      </div>
      <div className = "description">
        <Editable 
          value = {member.description} 
          name="description" 
          changeParentState={changeState} 
          className="memberDescription"
        />
      </div>
      <div className = "memberTagsContainer" onClick = {handlePrioritiesClick}>
        <div className = "tagsPositive" >
          <label>Like</label>
          {member.preferences.positive.map(tag => 
          <label id = {tag} className="tag">
            {tag}
            <i onClick = {handleDelete} class="fas fa-times dl"></i>
          </label>)}
        </div>
        <div className = "tagsNegative" >
          <label>Don't Like</label>
          {member.preferences.negative.map(tag => 
          <label id = {tag} className="tag">
            {tag}
            <i onClick = {handleDelete} class="fas fa-times dl"></i>
          </label>)}
        </div>
      </div>
    </div>
  )
}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}





export default FamilyMember