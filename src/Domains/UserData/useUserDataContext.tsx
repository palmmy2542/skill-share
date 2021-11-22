import axios from "axios";
import constate from "constate";
import { useState } from "react";
import { GAYEWAY_HOST } from "../../const";
import { UserAccount } from "../../interface";
import useUserAuthenticationContext from "../UserAuthentication/useUserAuthentication";

const useUserData = () => {
  const [userData, setUserData] = useState<UserAccount>({
    id: "",
    username: "",
    fname: "",
    lname: "",
    subscribing: 0,
    subscribers: 0,
  });
  const [isSubscribed, setIsScribed] = useState(false);

  const { canAccessService } = useUserAuthenticationContext();
  const token = canAccessService();

  const handleSubscribe = () => {};

  const getMe = async (): Promise<any> => {
    if (token) {
      const response = await axios({
        method: "GET",
        url: `${GAYEWAY_HOST}/account/me`,
        headers: {
          Authorization: `${token.trim()}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    }
    return null;
  };


  const getUserByUsername = async ({
    username,
  }: {
    username: string;
  }): Promise<any> => {
    if (token) {
      const response = await axios({
        method: "GET",
        url: `${GAYEWAY_HOST}/account/user?username=${username}`,
        headers: {
          Authorization: `${token.trim()}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    }
    return null;
  };

  const getAllUser = async (): Promise<any> => {
    if (token) {
      const response = await axios({
        method: "GET",
        url: `${GAYEWAY_HOST}/account/users`,
        headers: {
          Authorization: `${token.trim()}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    }
    return null;
  };

  return {
    userData,
    getAllUser,
    getUserByUsername,
    getMe,
    token,
    isSubscribed,
  };
};

const [UserDataProvider, useUserDataContext] = constate(useUserData);

export { UserDataProvider, useUserDataContext };

export default useUserDataContext;
