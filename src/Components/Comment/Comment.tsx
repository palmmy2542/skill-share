import { CloseOutlined, EditOutlined, RightOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, List } from "antd";
import React, { useMemo, useState } from "react";
import { CommentProps } from "../../interface";

function timeSince(date: string) {
  var seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const Comment = ({
  item,
  index,
  userId,
  deleteUserComment,
  editUserComment,
}: {
  item: CommentProps;
  index: number;
  userId: string;
  deleteUserComment: (id: string) => void;
  editUserComment: ({
    id,
    videoId,
    userId,
    description,
  }: {
    id: string;
    videoId: string;
    userId: string;
    description: string;
  }) => void;
}) => {
  const [willEdit, setWillEdit] = useState(false);
  const [newComment, setNewComment] = useState(item.description);
  const isEdited = useMemo(() => item.updatedAt !== item.createdAt, [item]);
  const renderIsEdited = () => (isEdited ? "· Edited" : "");

  const onEditComment = () => setWillEdit(!willEdit);

  return (
    <List.Item
      key={index}
      actions={[
        userId === item.userId && (
          <>
            <EditOutlined onClick={onEditComment} />
            <CloseOutlined onClick={() => deleteUserComment(item.id)} />
          </>
        ),
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar>{item.username}</Avatar>}
        title={
          <span>
            {item.username}{" "}
            <span style={{ fontWeight: "lighter" }}>
              {timeSince(item.updatedAt)} ago {renderIsEdited()}
            </span>
          </span>
        }
        description={
          willEdit ? (
            <Input.Group compact>
              <Input
                size="small"
                style={{ width: "90%" }}
                value={newComment}
                defaultValue={item.description}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                type="primary"
                htmlType="submit"
                size="small"
                icon={<RightOutlined />}
                onClick={() => {
                  editUserComment({
                    id: item.id,
                    userId: userId,
                    videoId: item.videoId,
                    description: newComment,
                  });
                  onEditComment();
                }}
              />
            </Input.Group>
          ) : (
            item.description
          )
        }
      />
    </List.Item>
  );
};

export default Comment;
