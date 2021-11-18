import { message } from "antd";
import axios from "axios";
import constate from "constate";
import { GAYEWAY_HOST } from "../../const";

const useClipComment = () => {
  const getVideoComment = async ({
    token,
    videoId,
  }: {
    token: string;
    videoId: string;
  }): Promise<any> => {
    if (token && videoId) {
      return axios({
        method: "GET",
        url: `${GAYEWAY_HOST}/comments/comment?videoId=${videoId}`,
        headers: {
          Authorization: `${token.trim()}`,
        },
      })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            return response.data;
          }
        })
        .catch((err) => message.error(err.response.data.message));
    }
    return null;
  };

  const postComment = async ({
    token,
    description,
    videoId,
    userId,
  }: {
    token: string;
    description: string;
    videoId: string;
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
          `${GAYEWAY_HOST}/comments/comment`,
          { videoId, description, userId },
          config
        )
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            return response.data;
          }
        })
        .catch((err) => message.error(err.response.data.message));
    }
    return null;
  };

  const editComment = ({
    token,
    id,
    videoId,
    userId,
    description,
  }: {
    token: string;
    id: string;
    videoId: string;
    userId: string;
    description: string;
  }) => {
    let config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    return axios
      .put(
        `${GAYEWAY_HOST}/comments/edit`,
        {
          id,
          videoId,
          userId,
          description,
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

  const deleteComment = async ({
    token,
    id,
  }: {
    token: string;
    id: string;
  }): Promise<any> => {
    if (token) {
      const config = {
        headers: {
          Authorization: `${token.trim()}`,
        },
      };
      return axios
        .delete(`${GAYEWAY_HOST}/comments/delete?id=${id}`, config)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            return response.data;
          }
        })
        .catch((err) => message.error(err.response.data.message));
    }
    return null;
  };

  return {
    getVideoComment,
    postComment,
    editComment,
    deleteComment,
  };
};

const [ClipCommentProvider, useClipCommentContext] = constate(useClipComment);

export { ClipCommentProvider, useClipCommentContext };

export default useClipCommentContext;
