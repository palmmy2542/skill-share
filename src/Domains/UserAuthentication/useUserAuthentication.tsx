import axios, { AxiosResponse } from "axios";
import constate from "constate";
import { useState } from "react";
import { baseUrl, TTL } from "../../const";
import { Token } from "../../utils";
import { InputValue, SignUpInputValue } from "./utils";

const useUserAuthentication = () => {
  const [userData] = useState({
    subscribing: 0,
    subscribers: 0,
    clips: 0,
  });

  const login = async ({
    username,
    password,
  }: InputValue): Promise<string | null | undefined> => {
    try {
      const response: AxiosResponse = await axios({
        method: "POST",
        url: `${baseUrl}/api/v1/signin`,
        data: {
          username: username,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const now = new Date();
        const item: Token = {
          token: response.data.token,
          expiry: now.getTime() + TTL,
        };
        localStorage.setItem("skillToken", JSON.stringify(item));
        return item.token;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const register = async ({
    username,
    password,
    fname,
    lname,
    email,
    tel,
  }: SignUpInputValue): Promise<any> => {
    const response = await axios.post(`${baseUrl}/api/v1/signup`, {
      username,
      password,
      fname,
      lname,
      email,
      tel,
    });
    console.log(response);

    if (response.statusText) {
      return response.data;
    }

    return null;
  };

  return {
    userData,
    login,
    register,
  };
};

const [UserAuthenticationProvider, useUserAuthenticationContext] = constate(
  useUserAuthentication
);

export { UserAuthenticationProvider, useUserAuthenticationContext };

export default useUserAuthenticationContext;
