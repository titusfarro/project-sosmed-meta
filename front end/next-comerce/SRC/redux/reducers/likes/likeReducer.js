const init_state = {
    value: false, 
} 

import like_types from "../types/like" 

const like_reducer = (state= init_state, action) => {
    if(action.type == like_types.POST_RENDER) {
        return{
            ...state, 
            id: action.payload.id, 
            username: action.payload.username, 
            email : action.payload.email, 
            full_name : action.payload.full_name,
            value: action.payload.value, 
        }
    }
    return state 
}

export default like_reducer