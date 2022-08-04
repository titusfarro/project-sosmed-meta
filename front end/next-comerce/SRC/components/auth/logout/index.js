import { Button, Center, Flex, Link } from "@chakra-ui/react"; 
import { useDispatch, useSelector } from "react-redux"; 
import auth_types from "../../../redux/reducers/auth/types";  
import jsCookie from 'js-cookie'; 

export default function logout() {

    const dispatch = useDispatch() 

    const userSelector =useSelector((state) => {
        return state.auth
    }) 

    const logoutHandler  = () => {
        jsCookie.remove('userData') 

        dispatch({
            type: auth_types.USER_LOGOUT
        })
    } 
    useEffect(() => {
        if (userSelector?.id) {
          router.push("/login") 
       }
       }, [userSelector?.id])

    

    return(
        <Flex>
            <Center>
                <Link >
                    <Button onClick={logoutHandler}>
                        LOGOUT {userSelector.username}
                    </Button>
                </Link>
            </Center>
        </Flex>
    )
}