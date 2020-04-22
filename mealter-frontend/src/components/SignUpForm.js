import React, {useState}  from 'react'


const SignUpForm = (props) => {

  const [formValues, setFormValues] = useState({})

  const closeForm = (e) => e.target.className === 'blured-background'?props.setShowForm(false):null

  const changeForm = (e) => setFormValues({...formValues, [e.target.name]: e.target.value})

  return(
    <div onClick = {closeForm} className = "blured-background">
      <form className = "authentication-form">
        <h1>Sign Up</h1>
        <input onChange= {changeForm} name = "userName" type="text" placeholder="Username..."></input>
        <input onChange= {changeForm} name = "email" type="text" placeholder="Email..."></input>
        <input onChange= {changeForm} name = "avatar" type="file" placeholder="UserPic"></input>
        <input onChange= {changeForm} name = "password" type="password" placeholder="Password..."></input>
        <input onChange= {changeForm} name = "password_confirmation" type="password" placeholder="Password..."></input>
        <input type="submit" value = "Sign Up"></input>
      </form>
    </div>
  )
}

export default SignUpForm