import constate from "constate";
import { useState } from "react";

const useUserData = () => {
  const [userData] = useState({
    subscribing: 0,
    subscribers: 0,
    clips: 0,
  });
  return {
    userData,
  };
};

const [UserDataProvider, useUserDataContext] = constate(useUserData);

export { UserDataProvider, useUserDataContext };

export default useUserDataContext;
