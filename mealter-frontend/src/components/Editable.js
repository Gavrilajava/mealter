import React, {useState} from 'react'


const Editable = (props) => {

  const [state, changeState] = useState({
    value: props.value,
    editable: false
  })

  const handleChange = (e) => {
    changeState({
      ...state,
      value: e.target.value
    })
  }

  const makeEditable = () => {
    changeState({
      ...state,
      editable: true
    })
  }

  const handleOnBlur = (e) => {
    props.changeState({name: props.name, value: e.target.value})
    changeState({
      ...state,
      editable: false
    })
  }

  return(
    state.editable
      ? <input onBlur={handleOnBlur} onChange={handleChange} value = {state.value}></input>
      : <p onClick={makeEditable} >{state.value}</p>

  )
}





export default Editable