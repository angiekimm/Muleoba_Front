import { combineReducers, createStore } from "redux";
//import reducer from "./Reducer";
//import searchreducer from "./searchReducer";
import reducer from "./Reducers";

//const store = createStore(combineReducers({reducer, searchreducer}));
const store = createStore(reducer);

export default store;