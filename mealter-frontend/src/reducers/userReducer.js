const initialUser = () => {
  if (localStorage.token){
    let user = {
      name: localStorage.username
    }
    return {user}
  }
  else {
    return {user: false}
  }
}

export default function UserReducer(state = initialUser(),action){

  switch(action.type){
      case "login":
          localStorage.username = action.auth.user.name
          localStorage.token = action.auth.token
          debugger
          return{
              ...state,
              user: action.auth.user
          }
      case "logout":
          localStorage.clear()
          return{
              ...state,
              user: false
          }
      default: 
          return state
  }

}