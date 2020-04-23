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
          return{
              ...state,
              user: {
                name: action.user.name
              }
          }
      case "logout":
          return{
              ...state,
              user: false
          }
      default: 
          return state
  }

}