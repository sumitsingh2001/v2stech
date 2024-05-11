import { combineReducers } from "redux";
import ApiSlice from "./Slices";

const rootReducers = combineReducers({
    apislicedata: ApiSlice
})

export default rootReducers