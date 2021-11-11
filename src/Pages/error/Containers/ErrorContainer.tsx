import { Button, Typography } from "antd";
import React from "react";
import { useHistory } from "react-router";
import error from "../../../Assets/error-page.png";

const ErrorContainer = () => {
  const history = useHistory();
  const handleBack = () => {
    history.push("/");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img src={error} />
      <Typography.Title>Page not found</Typography.Title>
      <Button onClick={handleBack} size="small">
        Back to home
      </Button>
    </div>
  );
};

export default ErrorContainer;
