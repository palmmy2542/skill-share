import { message } from "antd";
import axios from "axios";
import constate from "constate";
import { useEffect, useState } from "react";
import { AUTHENTICATION_HOST } from "../../const";
import { ClipProp, UserAccount } from "../../interface";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMe, setIsMe] = useState<boolean>(true);
  const [isSubscribed, setIsScribed] = useState(false);
  const [clips, setClips] = useState<Array<ClipProp>>([
    {
      title: "First Video0 1",
      description:
        "Enim id ullamco minim pariatur excepteur fugiat qui enim aliquip deserunt nostrud mollit. Aute esse commodo minim et nulla aliqua elit dolor tempor amet sunt incididunt Lorem sit. Occaecat aliqua ullamco sit elit nulla labore quis. Qui eu velit cillum consectetur aliqua pariatur dolor.Minim amet labore commodo enim consectetur mollit aliquip. In minim Lorem voluptate ex excepteur ex pariatur laborum fugiat. Deserunt eiusmod pariatur cillum pariatur consectetur nulla enim proident fugiat. Exercitation consectetur aliquip exercitation anim occaecat qui.",
      tags: ["game", "love", "comedy"],
      name: "TEST1",
      url: "https://skill-share-streaming-app.herokuapp.com/video/sample2/index.m3u8",
      isPlay: true,
      comments: [
        { name: "Name_1", comment: "Comment_1" },
        { name: "Name_2", comment: "Comment_2" },
        { name: "Name_3", comment: "Comment_3" },
      ],
    },
    {
      title: "First Video0 2",
      description:
        "Ex exercitation aute do enim magna proident eu ullamco laboris esse non excepteur esse. Culpa culpa reprehenderit incididunt reprehenderit dolor cillum in. Eiusmod aute laborum Lorem officia et qui aute qui enim.Tempor nisi Lorem cupidatat quis velit laborum duis esse et reprehenderit aliqua consequat nulla laborum. Laborum sit dolor consectetur mollit officia. Ad dolore sunt reprehenderit do velit est in nulla mollit reprehenderit proident aliqua elit. Officia cupidatat dolor aute nostrud adipisicing eiusmod proident eiusmod voluptate aliquip do qui. Do sit amet occaecat ea.",
      tags: ["game", "love", "comedy"],
      name: "TEST2",
      url: "https://skill-share-streaming-app.herokuapp.com/video/sample/index.m3u8",
      isPlay: false,
      comments: [
        { name: "Name_1", comment: "Comment_1" },
        { name: "Name_2", comment: "Comment_2" },
        { name: "Name_3", comment: "Comment_3" },
      ],
    },
    {
      title: "First Video0 3",
      description:
        "Fugiat pariatur in do reprehenderit nisi deserunt Lorem incididunt qui nulla. Adipisicing proident aliqua consectetur excepteur labore commodo. Nisi sunt ex veniam irure exercitation ex culpa incididunt. Veniam aute aliquip incididunt nulla. Sit nulla tempor enim incididunt velit elit irure elit in esse et qui. Deserunt non duis do velit cupidatat. Sunt amet laboris occaecat laboris dolore laborum officia adipisicing quis incididunt elit.Non laboris consectetur pariatur sit irure fugiat. Enim irure nostrud ut reprehenderit non fugiat nisi incididunt cupidatat sunt minim cillum eiusmod velit. Minim elit sunt commodo id labore nostrud duis excepteur minim eu veniam proident dolore. Exercitation dolore ut Lorem ipsum. Ad duis ut ipsum non ipsum excepteur id ex duis esse in laboris enim reprehenderit. Sit eu commodo proident enim magna pariatur deserunt voluptate minim nostrud mollit ea.",
      tags: ["game", "love", "comedy"],
      name: "TEST3",
      url: "https://skill-share-streaming-app.herokuapp.com/video/vertical_sample/index.m3u8",
      isPlay: false,
      comments: [
        { name: "Name_1", comment: "Comment_1" },
        { name: "Name_2", comment: "Comment_2" },
        { name: "Name_3", comment: "Comment_3" },
      ],
    },
    {
      title: "First Video0 4",
      description:
        "Ex veniam amet aute proident ut. In incididunt ut ut esse dolor. Est laborum nisi anim laborum anim sit in culpa magna commodo laborum fugiat voluptate mollit. Officia ad consequat consectetur aute adipisicing cupidatat pariatur adipisicing Lorem labore excepteur duis irure nisi. Aute anim est pariatur sint aliquip id aliqua. Eiusmod minim elit aliqua non culpa dolore.Et veniam ex culpa ipsum qui laboris. Nulla magna duis nostrud cupidatat. Dolore velit pariatur magna in Lorem est cillum elit laboris ut. Irure eiusmod dolore nulla eiusmod amet id elit mollit et proident in eu fugiat. Esse mollit ex aliquip aliquip nisi proident fugiat commodo voluptate duis veniam.",
      tags: ["game", "love", "comedy"],
      name: "TEST4",
      url: "https://skill-share-streaming-app.herokuapp.com/video/sample/index.m3u8",
      isPlay: false,
      comments: [
        { name: "Name_1", comment: "Comment_1" },
        { name: "Name_2", comment: "Comment_2" },
        { name: "Name_3", comment: "Comment_3" },
      ],
    },
  ]);
  const { canAccessService } = useUserAuthenticationContext();
  const token = canAccessService();

  const handleSubscribe = () => {};

  const getMe = async (): Promise<any> => {
    if (token) {
      const response = await axios({
        method: "GET",
        url: `${AUTHENTICATION_HOST}/account/me`,
        headers: {
          Authorization: `${token.trim()}`,
        },
      });
      console.log("response: ", response);
      if (response.status === 200) {
        return response.data;
      }
    }
    return null;
  };

  useEffect(() => {
    let isCancelled = true;
    getMe()
      .then((res) => {
        if (res && isCancelled) {
          localStorage.setItem("skillUsername", res.username);
          setUserData({
            username: res.username,
            id: res.id,
            fname: res.fname,
            lname: res.lname,
            subscribers: res.subscribers ?? 0,
            subscribing: res.subscribing ?? 0,
          });
        }
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });

    return () => {
      isCancelled = false;
    };
  }, []);

  console.log(userData);
  return {
    userData,
    clips,
    setClips,
    getMe,
    token,
    isMe,
    isSubscribed,
  };
};

const [UserDataProvider, useUserDataContext] = constate(useUserData);

export { UserDataProvider, useUserDataContext };

export default useUserDataContext;
