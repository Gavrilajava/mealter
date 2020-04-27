const initialFamily = () => {
  if (localStorage.family){
    console.log("initial family set to: " + localStorage.family)
    return JSON.parse(localStorage.family)
  }
  else {
    console.log("initial family set to: []")
    return {family: []}
  }
}

export default function FamilyReducer(state = initialFamily(),action){

  switch(action.type){
      case "setFamily":
          localStorage.family = JSON.stringify(action.family)
          console.log("ls family set to: " + localStorage.family)
          return action.family
      case 'editFamily':
        localStorage.family = JSON.stringify(action.family)
        console.log("ls family set to: " + localStorage.family)
        return action.family
      default: 
          return state
  }

}
