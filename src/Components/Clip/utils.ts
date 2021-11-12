import { message } from "antd";
import axios from "axios";
import { AUTHENTICATION_HOST } from "../../const";

export const updateVideo = ({
  token,
  videoId,
  title,
  description,
  permission,
}: {
  token: string | null;
  videoId: string;
  title: string;
  description: string;
  permission: string;
}) => {
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  console.log(token, videoId, title, description, permission);
  return axios
    .put(
      `${AUTHENTICATION_HOST}/videos/video/edit`,
      {
        videoId,
        title,
        description,
        permission,
      },
      config
    )
    .then((response) => {
      if (response.status === 200) {
        console.log("video: ", response.data);
        return response.data;
      }
    })
    .catch((err) => message.error(err.response.data.message));
};
