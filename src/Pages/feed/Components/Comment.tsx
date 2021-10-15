import React from "react";

const Comment = ({ name, comment }: { name: string; comment: string }) => {
  return (
    <div style={{ display: "flex" }}>
      <p>{comment}</p>
    </div>
  );
};

export default Comment;
