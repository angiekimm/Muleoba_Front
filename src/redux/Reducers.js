import { combineReducers } from "redux";

import idReducer from "./idReducer";
import searchReducer from "./searchReducer";

// Redcer-Persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage: storage,
};

const reducers = combineReducers({
    idReducer,
    searchReducer
});

export default persistReducer(persistConfig, reducers);