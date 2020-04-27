import React from 'react'
import {backEndUrl} from '../constants'
import {connect} from 'react-redux'
import Editable from './Editable'

const AddMember = (props) => {

  let member = props.family.find(member => member.id === props.member_id)

  const changeState = (obj) => {
    let new_member = {
      ...member,
      [obj.name]: obj.value
    }

    props.editFamily(props.family.filter(m => m.id !== props.member_id).concat(new_member))
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

  return(
    <div className = "container">
      <div className = "imgcont">
          <img alt = "avatar" src = {backEndUrl+member.userpic} />
      </div>
      <div className = "middle">
        <h2> <Editable value = {member.name} name="name" changeState={changeState} />  </h2>
      </div>
      <div className = "description">
        <Editable value = {member.description} name="name" changeState={changeState} />
      </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(AddMember)