import React from 'react'
import FamilyBrowser from '../components/FamilyBrowser'


const Family = () => {
  return(
    <div className="centered">
      {disclaimer()}
      <FamilyBrowser/>
    </div>
  )
}

const disclaimer = () => {
  return (
    <div >
      <h1 className ="title">This is your family</h1>
      {localStorage.username 
      ? <p></p>
      : <p>If you sign up, you can add your family here</p>}
    </div>
  )
}



export default Family