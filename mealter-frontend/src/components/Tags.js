import React from 'react'

const Tags = (props) => {

  const tagClass = (tag) => {
    if (props.activeTag === tag) {
      return "tag active"
    }
    else{
      return "tag"
    }
  }

  const toggleClick = (tag) => {
    if (props.activeTag === tag){
      props.setActiveTag(false)
    }
    else{
      props.setActiveTag(tag)
    }
  }

  return (
    <div className = "tagContainer">
      {props.tags.map(tag => <label onClick = {() => toggleClick(tag)} className= {tagClass(tag)}>{tag}</label>)}
    </div>
  )
}

export default Tags