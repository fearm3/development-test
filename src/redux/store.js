import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducer";

const reducer = combineReducers({ rootReducer });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
