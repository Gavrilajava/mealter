import React from 'react'
import FamilyBrowser from '../components/FamilyBrowser'


const Family = () => {
  return(
    <div>
      {disclaimer()}
      <FamilyBrowser/>
    </div>
  )
}

const disclaimer = () => {
  return (
    <div>
      <h1 className ="bigtext">This is Family Page</h1>
      <p>On this page you can see, edit and create your family. All ingredients calculations depends on your family size</p>
    </div>
  )
}



export default Family