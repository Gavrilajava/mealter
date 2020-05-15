import React from 'react'

const Tags = ({tags, activeTag, setActiveTag}) => {

  const tagClass = (tag) => {
    if (activeTag === tag) {
      return "tag active"
    }
    else{
      return "tag"
    }
  }

  const toggleClick = (tag) => {
    if (activeTag === tag){
      setActiveTag(false)
    }
    else{
      setActiveTag(tag)
    }
  }

  return (
    <div className = "tagContainer">
      {tags.map(tag => <label onClick = {() => toggleClick(tag)} className= {tagClass(tag)}>{tag}</label>)}
    </div>
  )
}

export default Tags