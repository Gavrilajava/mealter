import React, {useState}  from 'react'
import {backEndUrl} from '../constants'
import {connect} from 'react-redux'
import ImageUploader from 'react-images-upload';

const SignUpForm = (props) => {

  const [formValues, setFormValues] = useState({})

  const closeForm = (e) => e.target.className === 'blured-background'?props.setShowForm(false):null

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
          props.setShowForm(false)
        }
      })

  }

  return(
    <div onClick = {closeForm} className = "blured-background">
      
      <form onSubmit = {signUp} className = "authentication-form">
        <h1>Sign Up</h1>
        <input onChange= {changeForm} name = "name" type="text" placeholder="Username..."></input>
        <input onChange= {changeForm} name = "email" type="text" placeholder="Email..."></input>
        <ImageUploader
                withIcon={true}
                singleImage = {true}
                buttonText='Choose image'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
        {/* <input id = "avatar" name = "avatar" type="file" placeholder="UserPic"></input> */}
        <input onChange= {changeForm} name = "password" type="password" placeholder="Password..."></input>
        <input onChange= {changeForm} name = "password_confirmation" type="password" placeholder="Password..."></input>
        <input type="submit" value = "Sign Up"></input>
      </form>
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

