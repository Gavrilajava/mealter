import React, {useState, useEffect}  from 'react'
import {backEndUrl} from '../constants'
import {connect} from 'react-redux'

const LogInForm = (props) => {

  useEffect(() => {
    let content = document.querySelector("div.centered")
    content.className = "centered blur"
  }, [])


  
  const closeForm = (e) => {
    if (e.target.className === 'blured-background'){
      let content = document.querySelector("div.centered")
      content.className = "centered"
      props.setShowForm(false)
    
    }
  }

  const [formValues, setFormValues] = useState({})

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
          props.logIn(userInfo)
          let content = document.querySelector("div.centered")
          content.className = "centered"
          props.setShowForm(false)
        }
      })

  }

  
  return(
    <div onClick = {closeForm} className = "blured-background">
      <div className = "auth-bgrnd login anim-400">
        <form onSubmit = {logIn} className = "authentication-form login">
          <h1>Hello, friend, Welcome again</h1>
          <label for="name">Username:</label>
          <input onChange= {changeForm} type="text"  name = "name" placeholder="Username..."></input>
          <label for="password">Password:</label>
          <input onChange= {changeForm} type="password" name = "password" placeholder="Password..."></input>
          <button type="submit">Log in</button>
        </form>
        <div className="auth-left login anim-400-left"></div>
      </div>
    </div>
  )


}

const mapStateToProps = (state) => {
  return {user: state.UserReducer.user}
}

const mapDispatchToProps = (dispatch) => {
  return {logIn: ((auth) => dispatch({type: "login", auth: auth})), }
}


export default connect(mapStateToProps, mapDispatchToProps)(LogInForm)