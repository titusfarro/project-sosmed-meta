import jsCookie from "js-cookie";
import { axiosInstance } from "../../lib/api";
import auth_types from "../reducers/auth/types";
import qs from "qs"

export function userLogin(values, setSubmitting) {
  return async function (dispatch) {
    try {
      let body = {
          email: values.email,
          password: values.password, 
          username: values.username,
        
      };


      const res = await axiosInstance.post("/users/login", qs.stringify(body)); 
      console.log(res.data.result);

      const userData = res.data.result.user
      // {
      //   id: 2,
      //   username: "filo",
      //   email: "filo@mail.com",
      //   password: "12345",
      //   full_name: "filo sukamandi",
      // };

      const token = res.data.result.token;

      if (!res.data.result) {
        throw new Error("User not found");
      }

      // if (userData.password !== values.password) {
      //   throw new Error("Wrong password");
      // }
      console.log(userData);

      // const userData = user;
      const stringifiedUserData = JSON.stringify(userData);


      jsCookie.set("user_data", stringifiedUserData);
      jsCookie.set("auth_token", token);

      dispatch({
        type: auth_types.USER_LOGIN,
        payload: userData,
      });
      console.log("ASdasdas");


      setSubmitting(false);
    } catch (err) {
      console.log(err);

      setSubmitting(false);
    }
  };
}