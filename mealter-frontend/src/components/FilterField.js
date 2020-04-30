import React, {useEffect, useState} from 'react'

const FilterField = (props) => {

  return (
    <div>
      <input onChange = {(e) => props.changeFilter(e.target.value.toLowerCase())}></input>
    </div>
  )
}

export default FilterField