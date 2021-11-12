import { message } from "antd";
import axios from "axios";
import { PLAYLIST_HOST } from "../../const";

const postNewPlaylist = async ({
  token,
  title,
  description,
  videoList,
  permission,
  userId,
}: {
  token: string | null;
  title: string;
  description: string;
  videoList: string;
  permission: string;
  userId: string;
}): Promise<any> => {
  if (token) {
    const config = {
      headers: {
        Authorization: `${token.trim()}`,
      },
    };
    return axios
      .post(
        `${PLAYLIST_HOST}/playlists/playlist`,
        { title, description, videoList, permission, userId },
        config
      )
      .then((response) => {
        console.log("response", response);
        if (response.status === 200 || response.status === 201) {
          return response.data;
        }
      })
      .catch((err) => message.error(err.response.data.message));
  }
  return null;
};

const editPlaylist = async ({
  token,
  id,
  title,
  description,
  videoList,
  permission,
  userId,
}: {
  token: string | undefined;
  id: string;
  title: string;
  description: string;
  videoList: string;
  permission: string;
  userId: string;
}): Promise<any> => {
  if (token) {
    const config = {
      headers: {
        Authorization: `${token.trim()}`,
      },
    };
    return axios
      .post(
        `${PLAYLIST_HOST}/playlists/edit`,
        { id, title, description, videoList, permission, userId },
        config
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((err) => message.error(err.response.data.message));
  }
  return null;
};

const deletePlaylist = async ({
  token,
  id,
  userId,
}: {
  token: string | undefined;
  id: string;
  userId: string;
}): Promise<any> => {
  if (token) {
    const config = {
      headers: {
        Authorization: `${token.trim()}`,
      },
    };
    return axios
      .delete(
        `${PLAYLIST_HOST}/playlists/delete?id=${id}&?userId=${userId}`,
        config
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((err) => message.error(err.response.data.message));
  }
  return null;
};




export { postNewPlaylist, deletePlaylist, editPlaylist };
