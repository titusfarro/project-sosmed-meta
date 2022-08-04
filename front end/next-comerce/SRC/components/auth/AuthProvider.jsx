import jsCookie from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../lib/api";
import Auth_types from "../../redux/reducers/auth/types";


function AthrProvider({children}) {
    const [isAthrChecked, setIsAthrChecked] = useState(false) 

    const dispatch = useDispatch() 

    useEffect(() => {
        const samData = async () => {
            const userToken = jsCookie.get("auth_token") 

            if (userToken) {
                const usrResponse = await axiosInstance.get("/users/refresh-token", {
                    headers:{
                        authorization: userToken
                }
                }) 

                dispatch ({
                    type: "Auth_types.AUTH_LOGIN", 
                    payload: usrResponse.data.result.user,
                })
            }
            setIsAthrChecked(true) 
        
        } 
        samData()
    }, []) 

    if(!isAthrChecked) return <div>spinload....</div> 

    return children
} 

export default AthrProvider