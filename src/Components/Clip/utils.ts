import { message } from "antd";
import axios from "axios";
import { GAYEWAY_HOST } from "../../const";

export const convertPermission = (permission: boolean) =>
  permission ? "public" : "private";

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
  permission: boolean;
}) => {
  let config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  return axios
    .put(
      `${GAYEWAY_HOST}/videos/video/edit`,
      {
        videoId,
        title,
        description,
        permission: convertPermission(permission),
      },
      config
    )
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((err) => message.error(err.response.data.message));
};
