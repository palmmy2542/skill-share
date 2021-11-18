import { message } from "antd";
import axios from "axios";
import { GAYEWAY_HOST } from "../../const";
import { UploadClip } from "../../interface";

const formAxios = axios.create({
  transformRequest: [
    function (data: UploadClip, headers: any) {
      if (
        headers["Content-Type"] &&
        headers["Content-Type"].startsWith("multipart/form-data")
      ) {
        const form = new FormData();
        Object.entries(data).map(([key, value]) => {
          if (Array.isArray(value)) {
            const arrayKey = `${key}`;
            value.forEach((video) => {
              if (video) form.append(arrayKey, video);
            });
          } else {
            form.append(key, value);
          }
          return null;
        });
        return form;
      }
    },
  ],
});

export const upload = async ({
  token,
  body,
}: {
  token: string | null;
  body: UploadClip;
}): Promise<any> => {
  const headers = {
    "Content-Type":
      "multipart/form-data; charset=utf-8; boundary=" +
      Math.random().toString().substr(2),
    Authorization: `${token}`,
  };

  return formAxios.post(
    `${GAYEWAY_HOST}/videos/upload`,
    { ...body },
    { headers }
  );
};

export const editVideo = async ({
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
}): Promise<any> => {
  if (token) {
    const config = {
      headers: {
        Authorization: `${token.trim()}`,
      },
    };
    return axios
      .post(
        `${GAYEWAY_HOST}/videos/video/edit`,
        { videoId, title, description, permission },
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

export const deleteVideo = async ({
  token,
  videoId,
}: {
  token: string | null;
  videoId: string;
}): Promise<any> => {
  if (token) {
    const config = {
      headers: {
        Authorization: `${token.trim()}`,
      },
    };
    return axios
      .delete(`${GAYEWAY_HOST}/videos/video/delete?videoId=${videoId}`, config)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((err) => message.error(err.response.data.message));
  }
  return null;
};
