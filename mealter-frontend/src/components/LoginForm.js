import React, {useState}  from 'react'
import {backEndUrl} from '../constants'
import {connect} from 'react-redux'

const LogInForm = (props) => {

  const [formValues, setFormValues] = useState({})
  
  const closeForm = (e) => e.target.className === 'blured-background'?props.setShowForm(false):null

  const changeForm = (e) => setFormValues({...formValues, [e.target.name]: e.target.value})

  const logIn = (e) => {
    e.preventDefault()
    fetch(backEndUrl+'/login',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: formValues.name, 
        password: formValues.password,
      })
    })
      .then(res => res.json())
      .then(userInfo => {
        if (userInfo.token){
          localStorage.username = userInfo.user.name
          localStorage.token = userInfo.token
          props.logIn(userInfo.user)
          props.setShowForm(false)
        }
      })

  }

  
  return(
    <div onClick = {closeForm} className = "blured-background">
      <form onSubmit = {logIn} className = "authentication-form">
        <h1>Log in</h1>
        <input onChange= {changeForm} type="text"  name = "name" placeholder="Username..."></input>
        <input onChange= {changeForm} type="password" name = "password" placeholder="Password..."></input>
        <input type="submit" value = "Log in"></input>
      </form>
    </div>
  )


}

const mapStateToProps = (state) => {
  return{
    user: state.UserReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    logIn: ((user) => dispatch({type: "login", user: user})), 
    logOut: (() => dispatch({type: "logout"}) ) 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LogInForm)