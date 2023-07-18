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
    phone_number,
    business_name,
    business_address,
    business_website,
    business_volume,
    business_twitter,
    business_facebook,
    business_instagram,
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
  return response;

  // if (response.data.errorMessage) {
  //   const parsedError = JSON.stringify(response.data);
  //   console.log(parsedError);
  //   return parsedError;
  // } else {
  //   const parsedRes = await JSON.parse(response.data.body);
  //   console.log(`response ${response.data.body}`);

  //   const accessToken = JSON.stringify(
  //     parsedRes.AuthenticationResult.AccessToken
  //   );
  //   const refreshToken = JSON.stringify(
  //     parsedRes.AuthenticationResult.RefreshToken
  //   );
  //   const idToken = JSON.stringify(parsedRes.AuthenticationResult.IdToken);
  //   const tokenType = JSON.stringify(parsedRes.AuthenticationResult.TokenType);

  //   // assign params from access token
  //   const params = {
  //     AccessToken: accessToken,
  //   };

  //   localStorage.setItem("accessToken", accessToken);
  //   localStorage.setItem("refreshToken", refreshToken);
  //   localStorage.setItem("idToken", idToken);
  //   localStorage.setItem("tokenType", tokenType);

  //   return parsedRes;
  // }
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
