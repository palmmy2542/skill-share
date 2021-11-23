import { ExclamationCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Drawer, Input, List } from "antd";
import confirm from "antd/lib/modal/confirm";
import React, { useEffect, useRef, useState } from "react";
import useClipCommentContext from "../../Domains/ClipComment/useClipComment";
import useUserAuthenticationContext from "../../Domains/UserAuthentication/useUserAuthentication";
import { CommentProps } from "../../interface";
import Comment from "./Comment";
import "./index.css";

const CommentDrawer = ({
  visible,
  videoId,
  userId,
  creatorId,
  setVisible,
}: {
  visible: boolean;
  videoId: string;
  creatorId: string;
  userId: string | null;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { getVideoComment, postComment, deleteComment, editComment } =
    useClipCommentContext();
  const { canAccessService } = useUserAuthenticationContext();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [comment, setComment] = useState<string | undefined>();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const token = canAccessService();

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleUserComment = ({
    userId,
    token,
    videoId,
    description,
  }: {
    userId: string;
    token: string;
    videoId: string;
    description: string;
  }) => {
    if (userId)
      postComment({ userId, token, videoId, description }).then(() => {
        setIsUpdated(true);
      });
    setComment("");
  };

  const editUserComment = ({
    id,
    videoId,
    userId,
    description,
  }: {
    id: string;
    videoId: string;
    userId: string;
    description: string;
  }) => {
    if (token)
      editComment({ token, id, videoId, userId, description }).then(() =>
        setIsUpdated(true)
      );
  };

  const deleteUserComment = (id: string) => {
    confirm({
      title: "Do you want to delete this comment ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if (token) deleteComment({ token, id }).then(() => setIsUpdated(true));
      },
      onCancel() {
        console.log("Cancel delete comment");
      },
    });
  };

  useEffect(() => {
    if (token)
      getVideoComment({ token, videoId }).then((data) => {
        if (data) {
          const t = data.map((item: any, index: number) => {
            data[data.length - index - 1].edited = true;
            return data[data.length - index - 1];
          });
          setComments(t);
        }
        setIsUpdated(false);
        setIsLoading(false);
        scrollToBottom();
      });
  }, [isUpdated, videoId, getVideoComment]);

  return (
    <Drawer
      placement={"bottom"}
      closable={false}
      onClose={(e) => {
        setVisible(false);
      }}
      visible={visible}
      key={"bottom"}
      destroyOnClose
    >
      <Input.Group
        compact
        style={{ display: "flex", justifyContent: "center", padding: "12px" }}
      >
        <Input
          style={{ width: "80%" }}
          placeholder="Do you have something in mind ?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type="primary"
          htmlType="submit"
          icon={<RightOutlined />}
          onClick={() => {
            if (token && comment && userId)
              handleUserComment({
                token,
                videoId,
                userId,
                description: comment,
              });
          }}
        />
      </Input.Group>
      {comments && userId && (
        <List
          itemLayout="horizontal"
          dataSource={comments}
          loading={isLoading}
          renderItem={(item: CommentProps, index: number) => (
            <Comment
              item={item}
              index={index}
              userId={userId}
              deleteUserComment={deleteUserComment}
              editUserComment={editUserComment}
            />
          )}
        />
      )}
    </Drawer>
  );
};

export default CommentDrawer;
