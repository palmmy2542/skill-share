import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import constate from "constate";
import { useState } from "react";
import { AUTHENTICATION_HOST, TTL } from "../../const";
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
        url: `${AUTHENTICATION_HOST}/account/signin`,
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
        localStorage.setItem("skillUsername", username);
        return item.token;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      message.error("username or password is incorrect. Please try again.");
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
    const response = await axios.post(`${AUTHENTICATION_HOST}/account/signup`, {
      username,
      password,
      fname,
      lname,
      email,
      tel,
    });

    if (response.status === 201) {
      return response.data;
    }

    return null;
  };

  const isUserSignIn = (): boolean => {
    if (canAccessService()) {
      return true;
    } else return false;
  };

  const logout = (): void => {
    if (isUserSignIn()) {
      localStorage.removeItem("skillToken");
      localStorage.removeItem("skillUsername");
    }
  };

  const getAccessToken = (): Token | null => {
    const token: string | null = localStorage.getItem("skillToken");
    return token === null ? null : JSON.parse(token);
  };

  const canAccessService = (): string | null => {
    const now = new Date();
    const item: Token | null = getAccessToken();
    if (item === null) return null;
    if (now.getTime() > item.expiry) {
      localStorage.removeItem("skillToken");
      return null;
    } else return item.token;
  };

  return {
    userData,
    login,
    logout,
    register,
    canAccessService,
    isUserSignIn,
  };
};

const [UserAuthenticationProvider, useUserAuthenticationContext] = constate(
  useUserAuthentication
);

export { UserAuthenticationProvider, useUserAuthenticationContext };

export default useUserAuthenticationContext;
