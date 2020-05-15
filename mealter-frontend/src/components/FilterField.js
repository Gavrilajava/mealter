import React from 'react'

const FilterField = ({changeFilter}) => {

  return (
    <div className='filter-container'>
      <label className="title">Type something to filter:</label>
      <input className = 'filter' onChange = {(e) => changeFilter(e.target.value.toLowerCase())}></input>
    </div>
  )
}

export default FilterField