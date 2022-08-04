import { axiosInstance } from "../../lib/api"; 
import qs from "qs" 

export function userUpdate(values, setSubmitting) {
    return async function (dispatch) {
        try{
            let body = {
                full_name: values.full_name, 
                username: values.username, 
                bio: values.bio, 
            }; 
            await axiosInstance.patch(`/user/${values.id}`, qs.stringify(body)); 

            setSubmitting(false); 
        } catch(err){
            console.log(err); 

            setSubmitting(false);
        }
    };
}