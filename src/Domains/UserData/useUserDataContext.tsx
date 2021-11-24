import { message } from "antd";
import axios from "axios";
import constate from "constate";
import { useState } from "react";
import { GAYEWAY_HOST } from "../../const";
import { UserAccount } from "../../interface";
import useUserAuthenticationContext from "../UserAuthentication/useUserAuthentication";

const useUserData = () => {
  const [isSubscribed] = useState(false);

  const { canAccessService } = useUserAuthenticationContext();
  const token = canAccessService();

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

  const editProfile = ({
    token,
    fname,
    lname,
    tel,
    email,
  }: {
    token: string;
    fname: string;
    lname: string;
    tel: string;
    email: string;
  }): Promise<any> => {
    let config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    return axios
      .put(
        `${GAYEWAY_HOST}/account/user`,
        {
          fname,
          lname,
          tel,
          email,
        },
        config
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.data;
        }
      })
      .catch((err) => message.error(err.response.data.message));
  };

  return {
    getAllUser,
    getUserByUsername,
    getMe,
    token,
    isSubscribed,
    editProfile,
  };
};

const [UserDataProvider, useUserDataContext] = constate(useUserData);

export { UserDataProvider, useUserDataContext };

export default useUserDataContext;
