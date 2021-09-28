import axios from "axios";
import constate from "constate";
import { useState } from "react";
import { baseUrl } from "../../const";
import useUserAuthenticationContext from "../UserAuthentication/useUserAuthentication";

const useUserData = () => {
  const [userData] = useState({
    username: "",
    subscribing: 0,
    subscribers: 0,
    clips: [0, 0, 0],
  });
  const { canAccessService } = useUserAuthenticationContext();
  const token = canAccessService();

  const getMe = async (): Promise<any> => {
    if (token) {
      const response = await axios({
        method: "GET",
        url: `${baseUrl}/api/v1/me`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response: ", response);
      if (response.status === 200) {
        return response.data;
      }
    }

    return null;
  };

  getMe().then((res) => {
    console.log(res);
    // setUserData({ ...res, ...userData });
  });

  return {
    userData,
    getMe,
    token,
  };
};

const [UserDataProvider, useUserDataContext] = constate(useUserData);

export { UserDataProvider, useUserDataContext };

export default useUserDataContext;
