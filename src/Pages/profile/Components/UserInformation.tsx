import React from "react";
import { Row, Col, Divider } from "antd";

import { Typography } from "antd";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";

const { Title, Text } = Typography;

const UserInformation = (props: any) => {
  const {
    userData: { subscribing, subscribers, clips },
  } = useUserDataContext();
  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
        }}
      >
        <Col style={{ width: "128px" }}>
          <Title level={2}>{subscribing}</Title>
          <Text>Subscribing</Text>
        </Col>
        <Divider type="vertical" />
        <Col style={{ width: "128px" }}>
          <Title level={2}>{subscribers}</Title>
          <Text>Subscribers</Text>
        </Col>
        <Divider type="vertical" />
        <Col style={{ width: "128px" }}>
          <Title level={2}>{clips}</Title>
          <Text>Clips</Text>
        </Col>
        {/* <Col span={8}></Col>
        <Col span={8}></Col> */}
      </Row>
    </>
  );
};

export default UserInformation;
