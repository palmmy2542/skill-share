import { message } from "antd";
import axios from "axios";
import constate from "constate";
import { useState } from "react";
import { GAYEWAY_HOST } from "../../const";
import { AllPlaylist } from "../../interface";

const usePlaylist = () => {
  const [playlist, setPlaylist] = useState<AllPlaylist[]>([
    {
      title: "Play list 1",
      description:
        "In sunt enim qui duis. Ut esse fugiat fugiat proident voluptate aliqua fugiat incididunt mollit est commodo. Eiusmod incididunt nulla Lorem Lorem dolore aute irure enim id. Do ullamco Lorem proident sunt amet dolore minim.",
      id: "",
      permission: "",
      userId: "",
      videoList: [""],
    },
    {
      title: "Play list 2",
      description:
        "Sint elit cillum qui enim do commodo enim ullamco Lorem. In quis aute commodo laboris culpa labore elit exercitation ea nulla sint elit eiusmod. Minim aliqua sint tempor velit pariatur elit sunt exercitation. Laboris esse esse id reprehenderit.",
      id: "",
      permission: "",
      userId: "",
      videoList: [""],
    },
    {
      title: "Play list 3",
      description:
        "Cillum et elit occaecat fugiat. Minim commodo reprehenderit adipisicing do officia. Non mollit anim deserunt excepteur anim. Magna in est officia consectetur.",
      id: "",
      permission: "",
      userId: "",
      videoList: [""],
    },
    {
      title: "Play list 4",
      description:
        "Consequat fugiat et magna incididunt nisi nostrud. Voluptate elit et reprehenderit reprehenderit incididunt adipisicing sint excepteur velit. Velit velit dolor nisi exercitation elit nulla aliqua id.",
      id: "",
      permission: "",
      userId: "",
      videoList: [""],
    },
    {
      title: "Play list 5",
      description:
        "Et minim duis do voluptate fugiat enim. Id reprehenderit labore duis mollit nostrud cupidatat cillum ad sint pariatur minim labore culpa ad. Mollit voluptate amet anim culpa.",
      id: "",
      permission: "",
      userId: "",
      videoList: [""],
    },
  ]);

  const [videoInPlaylist, setVideoInPlaylist] = useState([
    {
      title: "First Video0 1",
      description:
        "Enim id ullamco minim pariatur excepteur fugiat qui enim aliquip deserunt nostrud mollit. Aute esse commodo minim et nulla aliqua elit dolor tempor amet sunt incididunt Lorem sit. Occaecat aliqua ullamco sit elit nulla labore quis. Qui eu velit cillum consectetur aliqua pariatur dolor.Minim amet labore commodo enim consectetur mollit aliquip. In minim Lorem voluptate ex excepteur ex pariatur laborum fugiat. Deserunt eiusmod pariatur cillum pariatur consectetur nulla enim proident fugiat. Exercitation consectetur aliquip exercitation anim occaecat qui.",
      name: "TEST1",
      url: "https://skill-share-streaming-app.herokuapp.com/video/616d0921b4496682144f3d5d/playlist.m3u8",
      isPlay: true,
      comments: [
        { name: "Name_1", comment: "Comment_1" },
        { name: "Name_2", comment: "Comment_2" },
        { name: "Name_3", comment: "Comment_3" },
      ],
    },
    {
      title: "First Video0 1",
      description:
        "Enim id ullamco minim pariatur excepteur fugiat qui enim aliquip deserunt nostrud mollit. Aute esse commodo minim et nulla aliqua elit dolor tempor amet sunt incididunt Lorem sit. Occaecat aliqua ullamco sit elit nulla labore quis. Qui eu velit cillum consectetur aliqua pariatur dolor.Minim amet labore commodo enim consectetur mollit aliquip. In minim Lorem voluptate ex excepteur ex pariatur laborum fugiat. Deserunt eiusmod pariatur cillum pariatur consectetur nulla enim proident fugiat. Exercitation consectetur aliquip exercitation anim occaecat qui.",
      name: "TEST1",
      url: "https://skill-share-streaming-app.herokuapp.com/video/616d0921b4496682144f3d5d/playlist.m3u8",
      isPlay: true,
      comments: [
        { name: "Name_1", comment: "Comment_1" },
        { name: "Name_2", comment: "Comment_2" },
        { name: "Name_3", comment: "Comment_3" },
      ],
    },
    {
      title: "First Video0 1",
      description:
        "Enim id ullamco minim pariatur excepteur fugiat qui enim aliquip deserunt nostrud mollit. Aute esse commodo minim et nulla aliqua elit dolor tempor amet sunt incididunt Lorem sit. Occaecat aliqua ullamco sit elit nulla labore quis. Qui eu velit cillum consectetur aliqua pariatur dolor.Minim amet labore commodo enim consectetur mollit aliquip. In minim Lorem voluptate ex excepteur ex pariatur laborum fugiat. Deserunt eiusmod pariatur cillum pariatur consectetur nulla enim proident fugiat. Exercitation consectetur aliquip exercitation anim occaecat qui.",
      name: "TEST1",
      url: "https://skill-share-streaming-app.herokuapp.com/video/sample2/playlist.m3u8",
      isPlay: true,
      comments: [
        { name: "Name_1", comment: "Comment_1" },
        { name: "Name_2", comment: "Comment_2" },
        { name: "Name_3", comment: "Comment_3" },
      ],
    },
    {
      title: "First Video0 1",
      description:
        "Enim id ullamco minim pariatur excepteur fugiat qui enim aliquip deserunt nostrud mollit. Aute esse commodo minim et nulla aliqua elit dolor tempor amet sunt incididunt Lorem sit. Occaecat aliqua ullamco sit elit nulla labore quis. Qui eu velit cillum consectetur aliqua pariatur dolor.Minim amet labore commodo enim consectetur mollit aliquip. In minim Lorem voluptate ex excepteur ex pariatur laborum fugiat. Deserunt eiusmod pariatur cillum pariatur consectetur nulla enim proident fugiat. Exercitation consectetur aliquip exercitation anim occaecat qui.",
      name: "TEST1",
      url: "https://skill-share-streaming-app.herokuapp.com/video/sample2/playlist.m3u8",
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
      name: "TEST2",
      url: "https://skill-share-streaming-app.herokuapp.com/video/sample/playlist.m3u8",
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
      name: "TEST3",
      url: "https://skill-share-streaming-app.herokuapp.com/video/vertical_sample/playlist.m3u8",
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
      name: "TEST4",
      url: "https://skill-share-streaming-app.herokuapp.com/video/sample/playlist.m3u8",
      isPlay: false,
      comments: [
        { name: "Name_1", comment: "Comment_1" },
        { name: "Name_2", comment: "Comment_2" },
        { name: "Name_3", comment: "Comment_3" },
      ],
    },
  ]);

  const getPlaylistByUserId = async (
    token: string | undefined,
    id: string
  ): Promise<Array<AllPlaylist> | null> => {
    if (token && id) {
      return axios({
        method: "GET",
        url: `${GAYEWAY_HOST}/playlists/playlist?creatorId=${id}`,
        headers: {
          Authorization: `${token.trim()}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          }
        })
        .catch((err) => message.error(err.response.data.message));
    }
    return null;
  };

  const getAllPlaylist = async (token: string | undefined): Promise<any> => {
    if (token) {
      return axios({
        method: "GET",
        url: `${GAYEWAY_HOST}/playlists/playlist`,
        headers: {
          Authorization: `${token.trim()}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.data;
          }
        })
        .catch((err) => message.error(err.response.data.message));
    }
    return null;
  };
  return {
    playlist,
    videoInPlaylist,
    setVideoInPlaylist,
    setPlaylist,
    getPlaylistByUserId,
    getAllPlaylist,
  };
};

const [PlayListProvider, usePlaylistContext] = constate(usePlaylist);

export { PlayListProvider, usePlaylistContext };

export default usePlaylistContext;
