import React, {useState, useEffect}  from 'react'
import {backEndUrl} from '../constants'
import {connect} from 'react-redux'
import ImageUploader from 'react-images-upload';

const SignUpForm = (props) => {

  

  useEffect(() => {
    let content = document.querySelector("div.centered")
    content.className = "centered blur"
  }, [])


  
  const closeForm = (e) => {
    if (e.target.className === 'blured-background'){
      let content = document.querySelector("div.centered")
      content.className = "centered"
      props.setShowForm(false)
    
    }
  }

  const [formValues, setFormValues] = useState({})

  const changeForm = (e) => setFormValues({...formValues, [e.target.name]: e.target.value})

  const onDrop = (picture) =>  setFormValues({...formValues, avatar: picture})
  


  const signUp = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("avatar", formValues.avatar[0]);
    formData.append("name", formValues.name);
    formData.append("password", formValues.password);
    formData.append("email", formValues.email);
    fetch(backEndUrl+'/users',{
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(userInfo => {
        if (userInfo.token){
          props.logIn(userInfo)
          let content = document.querySelector("div.centered")
          content.className = "centered"
          props.setShowForm(false)
        }
      })

  }

  return(
    <div onClick = {closeForm} className = "blured-background">
      <div className = "auth-bgrnd signup  anim-600">
        <form onSubmit = {signUp} className = "authentication-form signup">
          <h3>Hello and welcome!</h3>
          <label for="name">User image (can be omitted):</label>
          <ImageUploader
                  className = "image-uploader"
                  buttonClassName = 'submit'
                  withIcon={true}
                  name='image'
                  withLabel = {true}
                  withPreview = {true}
                  singleImage = {true}
                  buttonText='Choose image'
                  onChange={onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                  maxFileSize={5242880} 
                  fileSizeError = "Whoa, take it easy! This picture is too big!"
                  fileTypeError = "Sorry, this file type is not supported"
              />
          <label for="name">Username:</label>
          <input onChange= {changeForm} name = "name" type="text" placeholder="Username..."></input>
          <label for="name">Email (Just in case you forget your password):</label>
          <input onChange= {changeForm} name = "email" type="text" placeholder="Email..."></input>
          <label for="password">Password:</label>
          <input onChange= {changeForm} name = "password" type="password" placeholder="Password..."></input>
          <label for="password">Type it again please:</label>
          <input onChange= {changeForm} name = "password_confirmation" type="password" placeholder="Password..."></input>
          
          <button type="submit">Sign up</button>
        </form>
        <div className="auth-left signup  anim-600-left"></div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {user: state.UserReducer.user}
}

const mapDispatchToProps = (dispatch) => {
  return {logIn: ((auth) => dispatch({type: "login", auth: auth})) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)

