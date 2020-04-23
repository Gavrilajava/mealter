import React, {useState} from 'react';
import LogInForm from '../../components/LogInForm';
import SignUpForm from '../../components/SignUpForm'
import {connect} from 'react-redux'

const Header = (props) => {

  const [showForm, setShowForm] = useState(false)
  

  const buttons = () => {
      return(
        <div>
          <li onClick={() => setShowForm("login")}className = "header-user">Log in</li>
          <li onClick={() => setShowForm("signup")}className = "header-user">Sign up</li>
          {showForm==="login"?<LogInForm setShowForm = {setShowForm}/>:null}
          {showForm==="signup"?<SignUpForm setShowForm = {setShowForm}/>:null}
        </div>
      )
    
  }

  return(
    <div>
      <ul className = "header">
        <li className = "header-item"><a className = "menu-item" href="/">Home</a></li>
        <li className = "header-item"><a className = "menu-item" href="/recipes">Recipes</a></li>
        <li className = "header-item"><a className = "menu-item" href="/family">Family</a></li>
        <li className = "header-item"><a className = "menu-item" href="/schedule">Schedule</a></li>
        <li className = "header-item"><a className = "menu-item" href="/recipes">Recipes</a></li>
        <li className = "header-item"><a className = "menu-item" href="/grocery">Grocery List</a></li>
        <li className = "header-item"><a className = "menu-item" href="/about">About Me</a></li>
        {props.user? <div onClick= {props.logOut} className = "header-user">{props.user.name} </div>: buttons()}
      </ul>

    </div>
  )  
}



const mapStateToProps = (state) => {
  return {user: state.UserReducer.user}
}

const mapDispatchToProps = (dispatch) => {
  return {logOut: (() => dispatch({type: "logout"}))}
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)