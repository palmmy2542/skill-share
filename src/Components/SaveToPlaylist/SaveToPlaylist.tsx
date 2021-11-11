import { Col, Drawer, Row, Typography, Button, Image } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import "./index.css";

const { Text } = Typography;
const SaveToPlayList = ({
  visible,
  handleClose,
}: {
  visible: boolean;
  handleClose: () => void;
}) => {
  const cols = [];
  for (let i = 0; i < 10; i++) {
    cols.push(
      <Col
        xs={8}
        md={4}
        style={{
          display: "flex",
          justifyContent: "center",
          height: "250px",
          width: "100%",
        }}
      >
        <Image
          width={200}
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
      </Col>
    );
  }
  return (
    <Drawer
      title={`Save to playlist`}
      headerStyle={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      }}
      placement={"bottom"}
      closable={true}
      onClose={handleClose}
      visible={visible}
      key={"bottom"}
      destroyOnClose
      height="100%"
      width="100%"
    >
      <Row className="playlist-info">
        <Col span={12} className="playlist-img">
          <Image src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
        </Col>
        <Col span={12}>
          <Title level={4}>Playlist name</Title>
          <Title level={5} style={{ fontWeight: 400 }}>
            Playlist description Playlist description Playlist description
            Playlist description Playlist description
          </Title>
          <Text strong>Playlist tag</Text> <br />
          <Text
            style={{
              color: "#9e9e9e",
            }}
          >
            x clip by <Text strong> username </Text>
          </Text>
        </Col>
      </Row>
      <Button size={"large"} className="save-clip-button">
        Save clip to playlist
      </Button>
      <Row gutter={[8, 8]}> {cols} </Row>
    </Drawer>
  );
};

export default SaveToPlayList;
