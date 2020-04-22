import React from 'react';


const Header = () => {

  return(
    <ul className = "header">
      <li className = "header-item"><a className = "menu-item" href="/">Home</a></li>
      <li className = "header-item"><a className = "menu-item" href="/recipes">Recipes</a></li>
      <li className = "header-item"><a className = "menu-item" href="/family">Family</a></li>
      <li className = "header-item"><a className = "menu-item" href="/schedule">Schedule</a></li>
      <li className = "header-item"><a className = "menu-item" href="/recipes">Recipes</a></li>
      <li className = "header-item"><a className = "menu-item" href="/grocery">Grocery List</a></li>
      <li className = "header-item"><a className = "menu-item" href="/about">About Us</a></li>
      <li className = "header-user"><a className = "menu-item" href="about">Log-in</a></li>
    </ul>
  )

  
}

export default Header