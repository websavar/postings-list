import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

import posts from "./posts/postReducer";

const rootReducers = combineReducers({
    posts
});

const store = createStore(rootReducers, applyMiddleware(logger));

export default store;
