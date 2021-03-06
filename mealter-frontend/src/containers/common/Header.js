import React, {useState} from 'react';
import LogInForm from '../../components/LogInForm';
import SignUpForm from '../../components/SignUpForm'
import {connect} from 'react-redux'
import {backEndUrl} from '../../constants'
import {useLocation} from 'react-router-dom'

const Header = ({user, addAvatar, logOut}) => {
  let location = useLocation()
  let pointer = location.pathname.split('/')
  !pointer[1]? pointer = "home" : pointer = pointer[1]

  const [showForm, setShowForm] = useState(false)
  
  const avatar = () => {
    if (user.avatar){
      return <img alt ="avatar" className="avatar" src = {`${backEndUrl}${user.avatar}`} />
    }
    else{
      fetch(`${backEndUrl}/user/avatar`,{
        method: "GET",
        headers:{
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(resp => resp.json())
        .then(avatar => addAvatar(avatar.link))
      return null
    }
  }

  

  const userData = () => {
    if (user){
      return (
      <div className= "user-info">
        <p className="navlinks-right"  onClick={logOut}>{user.name}</p>
          {avatar()} 
      </div>
      )
    }
    else{
      return(
        <div className= "user-info">
          <p className="navlinks-right"  onClick={() => setShowForm("login")} >Log in</p>
          <p className="navlinks-right"  onClick={() => setShowForm("signup")} >Sign up</p>
          {showForm==="login"?<LogInForm setShowForm = {setShowForm}/>:null}
          {showForm==="signup"?<SignUpForm setShowForm = {setShowForm}/>:null}
        </div>
      )
    }
  }

  return(
    <nav>
      <a href="/">Home</a>
      <a href="/recipes">Recipes</a>
      <a href="/family">Family</a>
      <a href="/schedule">Schedule</a>
      <a href="/grocery">Grocery List</a>
      <a href="/about">About Me</a>
      <div className={`animation start-${pointer}`}></div>

      {userData()}


    </nav>
  )  
}




const mapStateToProps = (state) => {
  return {user: state.UserReducer.user}
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (() => dispatch({type: "logout"})),
    addAvatar: ((avatar) => dispatch({type: "add_avatar", avatar: avatar}))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)