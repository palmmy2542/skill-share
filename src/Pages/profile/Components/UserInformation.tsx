import React from "react";
import { Row, Col, Divider } from "antd";

import { Typography } from "antd";

const { Title, Text } = Typography;

const UserInformation = (props: any) => {
  const { subscribing, subscribers, clips } = props;
  return (
    <>
      <Row>
        <Col span={2} />
        <Col span={6}>
          <Title level={2}>{subscribing}</Title>
          <Text>Subscribing</Text>
        </Col>
        <Col span={1}>
          <Divider type="vertical" />
        </Col>
        <Col span={6}>
          <Title level={2}>{subscribers}</Title>
          <Text>Subscribers</Text>
        </Col>
        <Col span={1}>
          <Divider type="vertical" />
        </Col>
        <Col span={6}>
          <Title level={2}>{clips.length ?? 0}</Title>
          <Text>Clips</Text>
        </Col>
        <Col span={2} />
      </Row>
    </>
  );
};

export default UserInformation;
