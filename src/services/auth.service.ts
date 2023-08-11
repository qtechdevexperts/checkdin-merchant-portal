import axios from "axios";
import {
  AUTH_SIGNIN_URL,
  AUTH_SIGNUP_URL,
  AUTH_SIGNUP_CONFIRMATION_URL,
  AUTH_FORGOTPASSWORD_URL,
  AUTH_CONFIRMFORGOTPASSWORD_URL,
} from "../constants.js";

export const auth_register = async (
  email: string,
  password: string,
  phone_number: string,
  business_name: string,
  business_address: string,
  business_website: string,
  business_volume: string,
  business_twitter: string,
  business_facebook: string,
  business_instagram: string
) => {
  console.log("auth_reg: " + AUTH_SIGNUP_URL);
  let body = {
    email,
    password,
    contact_number: phone_number,
    name: business_name,
    address: business_address,
    // business_website,
    description: business_volume,
    // business_twitter,
    // business_facebook,
    // business_instagram,
  };
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios.post(AUTH_SIGNUP_URL, body, axiosConfig);
};

export const auth_login = async (username: string, password: string) => {
  console.log("auth_login: " + AUTH_SIGNIN_URL);

  let body = { email: username, password };
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(AUTH_SIGNIN_URL, body, axiosConfig);
  // console.log("res -->", response);
  // return response;


    // console.log("data",response.data.data.data)
    // const parsedRes = await JSON.parse(response.data.data.data);
    // console.log(`response ${response.data.data}`);
    // console.log('parsedData',parsedRes)
    const accessToken = JSON.stringify(
      response.data.data.data.access_token
    );
    // const refreshToken = JSON.stringify(
    //   parsedRes.access_token
    // );
    // const idToken = JSON.stringify(parsedRes.access_token);
    // const tokenType = JSON.stringify(parsedRes.AuthenticationResult.TokenType);

    // assign params from access token
    // const params = {
    //   AccessToken: accessToken,
    // };

    localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem("refreshToken", refreshToken);
    // localStorage.setItem("idToken", idToken);
    // localStorage.setItem("tokenType", tokenType);

    // console.log('parsed',parsedRes)
    return response;
  
};

export const auth_signup_conf = async (code: string, username: string) => {
  let body = { code, username };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .post(AUTH_SIGNUP_CONFIRMATION_URL, body, axiosConfig)
    .then((response) => {
      console.log(response);
      const parsedResponse = JSON.stringify(response.data);

      return parsedResponse;
    })
    .catch((err) => {
      console.log(err);

      const parsedError = JSON.stringify(err);

      return parsedError;
    });
};

export const authSignoutConf = async () => {
  localStorage.setItem("accessToken", "");
  localStorage.setItem("refreshToken", "");
  localStorage.setItem("idToken", "");
  localStorage.setItem("tokenType", "");
};

export const forgotPassword = async (username: string) => {
  let body = { username };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios.post(AUTH_FORGOTPASSWORD_URL, body, axiosConfig);
};

export const forgotPasswordConfirm = async (
  code: string,
  password: string,
  username: string
) => {
  const body = { code, password, username };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios.post(AUTH_CONFIRMFORGOTPASSWORD_URL, body, axiosConfig);
};
