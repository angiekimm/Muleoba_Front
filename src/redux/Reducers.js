import { combineReducers } from "redux";

import idReducer from "./idReducer";
import searchReducer from "./searchReducer";

const reducers = combineReducers({
    idReducer,
    searchReducer
});

export default reducers;