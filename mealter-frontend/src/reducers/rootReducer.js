import UserReducer from "./userReducer"
import {combineReducers} from "redux"

const initialState = {
    img: {
        url: "https://www.biggerbolderbaking.com/wp-content/uploads/2017/09/1C5A0996.jpg",
        comments: ["Yummy....", "Tummy....", "lots of sugar", "Moist"],
        likes: 0
    }
}

function ImgReducer(state= initialState, action){
    console.log("state:", state)
    console.log("action:", action)

    switch(action.type){
        case "addLike": 
            return{
                ...state,
                img: { ...state.img, likes: state.img.likes + 1}
            }
        case "addComment":
            return{
                ...state,
                img: {...state.img, comments: [...state.img.comments, action.comment] }
            }
        default: {
            return state
        }
    }

    // return state
}

const rootReducer = combineReducers({ImgReducer, UserReducer})
export default rootReducer