const init_state = {
    value: false, 
} 

import post_types from "../types/post" 

const post_reducer = (state= init_state, action) => {
    if(action.type == post_types.POST_RENDER) {
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

export default post_reducer