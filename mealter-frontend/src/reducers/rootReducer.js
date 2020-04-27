import UserReducer from "./userReducer"
import FamilyReducer from './familyReducer'
import {combineReducers} from "redux"

const initialState = {}


function ImgReducer(state= initialState, action){



  return state

}

const rootReducer = combineReducers({ImgReducer, UserReducer, FamilyReducer})
export default rootReducer