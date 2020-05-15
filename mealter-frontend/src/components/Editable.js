import React, {useState} from 'react'



const Editable = ({value, changeParentState, name, fontSize, className}) => {

  const [state, changeState] = useState({
    value,
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
    changeParentState({name, value: e.target.value})
    changeState({
      ...state,
      editable: false
    })
  }

  let setFontSize
  fontSize ? setFontSize = {fontSize} : setFontSize = null

  return(
    state.editable

      ? <textarea wrap="soft" className = {className} style = {setFontSize} onBlur={handleOnBlur} onChange={handleChange} value = {state.value}></textarea>
      : <p className = {className} style = {setFontSize} onClick={makeEditable} >{state.value}</p>

  )
}






export default Editable