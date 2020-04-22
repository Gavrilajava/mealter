import React from 'react'


const LogInForm = (props) => {
  
  const closeForm = (e) => e.target.className === 'blured-background'?props.setShowForm(false):null
  
  return(
    <div onClick = {closeForm} className = "blured-background">
      <form className = "authentication-form">
        <h1>Log in</h1>
        <input type="text" placeholder="Username..."></input>
        <input type="password" placeholder="Password..."></input>
        <input type="submit" value = "Log in"></input>
      </form>
    </div>
  )


}

export default LogInForm