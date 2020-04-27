import React, {useEffect} from 'react'
import FamilyMember from './FamilyMember'
import {connect} from 'react-redux'
import {backEndUrl} from '../constants'

const FamilyBrowser = (props) => {

  useEffect(() => {
    if (localStorage.token){
      fetch(`${backEndUrl}/api/v1/family`,{
        method: "GET",
        headers:{Authorization: `Bearer ${localStorage.token}`}
      })
        .then(resp => resp.ok ? resp.json() : throwError(resp.status))
        .then(backend => {
      
          console.log("backend: " + backend.family)
          if(JSON.stringify(backend.family) !== JSON.stringify(props.family)){
            props.setFamily(backend.family)
          }
        })
        .catch(console.log)
    }
    return undefined
  })

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
          debugger
          console.log("backend: " + backend.family)
          props.setFamily(backend.family)
          
        })
        .catch(console.log)
    }
    return undefined
  }

  console.log("props before render: " + props.family)
  
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
      {props.family.map((member) => <FamilyMember member_id = {member.id}/>)}
      {addButton()}
    </div>
  )
}

const throwError = (e) => {throw Error(`Request rejected with status ${e.status}`)}


const mapStateToProps = (state) => {
  return {family: state.FamilyReducer}
}

const mapDispatchToProps = (dispatch) => {
  return {
    editFamily: ((family) => dispatch({type: "editFamily", family: family})),
    setFamily: ((family) => dispatch({type: "setFamily", family: family}))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FamilyBrowser)