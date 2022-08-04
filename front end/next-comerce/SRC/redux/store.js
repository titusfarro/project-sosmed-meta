import { combineReducers } from "redux"; 
import  authReducer from "./reducers/auth/auth"; 

import { configureStore } from "@reduxjs/toolkit"; 
import thunk from "redux-thunk"
import post_reducer from "./reducers/post/postReducer"; 
import like_reducer from "./reducers/likes/likeReducer"; 
import comments_reducer from "./reducers/comments/commentsReducer";


const rootReducer = combineReducers({
    auth: authReducer, 
    post: post_reducer, 
    like: like_reducer, 
    comment: comments_reducer,
});  

// const store = configureStore({
    //reducer: rootReducer, 
    // middleware: [thunk], 
// });


// const store = configureStore({
//     reducer: rootReducer,
// }) 

export default rootReducer