import { combineReducers, createStore } from "redux";
//import reducer from "./Reducer";
//import searchreducer from "./searchReducer";
import reducer from "./Reducers";

// Redux-Persist
import { persistStore } from "redux-persist";

//const store = createStore(combineReducers({reducer, searchreducer}));
export const store = createStore(reducer);

export const persistor = persistStore(store);

export default { store, persistor };