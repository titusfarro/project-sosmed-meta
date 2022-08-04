import Auth_types from "./types";


const init_state = {
    id: 0, 
    username: "",  
    email : "", 
    full_name : "", 
    
}; 

export default function authReducer(state = init_state, action) { 

    if (action.type === Auth_types.USER_LOGIN) {
        return {
            ...state, 
            id: action.payload.id, 
            username: action.payload.username, 
            email : action.payload.email, 
            full_name : action.payload.full_name,
        }
    } else if (action.type === Auth_types.USER_LOGOUT) {
        return init_state;
    }
   
    return state;
} 