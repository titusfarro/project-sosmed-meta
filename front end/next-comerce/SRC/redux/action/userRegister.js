import jsCookie from "js-cookie";
import { axiosInstance } from "../../lib/api";
import auth_types from "../reducers/auth/types"; 
import qs from "qs";

export function UserRegister(values, setSubmitting) {
    console.log("adasad")
  return async function (dispatch) {
    try {

    console.log("adasad")

      let body = {
          email: values.email,
          password: values.password, 
          username: values.username, 
          full_name: values.full_name
        
      };
    //   console.log(qs.stringify(body));

      const res = await axiosInstance.post("/users/register", qs.stringify(body)); 

    //   const userData = res.data.result;
      const userData = res.data.result.user;
      const token = res.data.result.token;
      // {
      //   id: 2,
      //   username: "filo",
      //   email: "filo@mail.com",
      //   password: "12345",
      //   full_name: "filo sukamandi",
      // };
      

    //   if (!res.data.result) {
    //     throw new Error("User not found");
    //   }

      // if (userData.password !== values.password) {
      //   throw new Error("Wrong password");
      // }

      // const userData = user;
      // const stringifiedUserData = JSON.stringify(userData.email);

    //   console.log(userData);

      jsCookie.set("auth_token", token);

      dispatch({
        type: auth_types.USER_LOGIN,
        payload: userData,
      })

      setSubmitting(false);
  
    } catch (err) {
      console.log(err);     

      setSubmitting(false); 

  
    }
  };
}