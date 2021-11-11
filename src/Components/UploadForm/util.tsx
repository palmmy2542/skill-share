import axios from "axios";
import { AUTHENTICATION_HOST } from "../../const";
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
        });
        console.log(form.get("video"));
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
    `${AUTHENTICATION_HOST}/videos/upload`,
    { ...body },
    { headers }
  );
};
