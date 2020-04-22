import React, {useState} from 'react';
import LogInForm from '../../components/LogInForm';
import SignUpForm from '../../components/SignUpForm'


const Header = () => {

  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showSignUpForm, setShowSignUpForm] = useState(false)

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
        <button onClick={() => setShowLoginForm(!showLoginForm)}className = "header-user">Log in</button>
        <button onClick={() => setShowSignUpForm(!showSignUpForm)}className = "header-user">Sign up</button>
        {showLoginForm?<LogInForm setShowForm = {setShowLoginForm}/>:null}
        {showSignUpForm?<SignUpForm setShowForm = {setShowSignUpForm}/>:null}
      </ul>

    </div>
  )

  
}

export default Header