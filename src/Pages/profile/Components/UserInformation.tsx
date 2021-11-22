import React from "react";
import { Row, Col, Divider } from "antd";

import { Typography } from "antd";

const { Title, Text } = Typography;

const UserInformation = (props: any) => {
  const { playlistNumber, clipNumber } = props;
  return (
    <>
      <Row justify="center" style={{ marginTop: "16px" }}>
        <Col span={2}>
          <Divider type="vertical" />
        </Col>
        <Col span={9}>
          <Title level={2}>{playlistNumber ?? 0}</Title>
          <Text>Playlists</Text>
        </Col>
        <Col span={1}>
          <Divider type="vertical" />
        </Col>
        <Col span={9}>
          <Title level={2}>{clipNumber ?? 0}</Title>
          <Text>Clips</Text>
        </Col>
        <Col span={2}>
          <Divider type="vertical" />
        </Col>
      </Row>
    </>
  );
};

export default UserInformation;
