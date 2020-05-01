import React, {useEffect, useState} from 'react'

const FilterField = (props) => {

  return (
    <div className='filter-container'>
      <label className="title">Type something to filter:</label>
      <input className = 'filter' onChange = {(e) => props.changeFilter(e.target.value.toLowerCase())}></input>
    </div>
  )
}

export default FilterField