import React, {useState}  from 'react'
import {backEndUrl} from '../constants'
import {connect} from 'react-redux'

const SignUpForm = (props) => {

  const [formValues, setFormValues] = useState({})

  const closeForm = (e) => e.target.className === 'blured-background'?props.setShowForm(false):null

  const changeForm = (e) => setFormValues({...formValues, [e.target.name]: e.target.value})

  const signUp = (e) => {
    e.preventDefault()
    fetch(backEndUrl+'/users',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: formValues.name, 
        password: formValues.password,
        email: formValues.email
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
      <form onSubmit = {signUp} className = "authentication-form">
        <h1>Sign Up</h1>
        <input onChange= {changeForm} name = "name" type="text" placeholder="Username..."></input>
        <input onChange= {changeForm} name = "email" type="text" placeholder="Email..."></input>
        <input onChange= {changeForm} name = "avatar" type="file" placeholder="UserPic"></input>
        <input onChange= {changeForm} name = "password" type="password" placeholder="Password..."></input>
        <input onChange= {changeForm} name = "password_confirmation" type="password" placeholder="Password..."></input>
        <input type="submit" value = "Sign Up"></input>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)

