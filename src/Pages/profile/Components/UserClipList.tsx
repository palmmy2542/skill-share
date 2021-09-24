import React from "react";
import { Row, Col, Tabs } from "antd";
import { ImFilm, ImLock } from "react-icons/im";
import Clip from "../../../Components/Clip";
const { TabPane } = Tabs;
const clips = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const UserClipList = (props: any) => {
  return (
    <>
      <Tabs defaultActiveKey="1" centered tabPosition={"bottom"}>
        <TabPane
          tab={
            <span>
              <ImFilm />
            </span>
          }
          key="1"
        />
        <TabPane
          tab={
            <span>
              <ImLock />
            </span>
          }
          key="2"
        />
      </Tabs>
      <Row gutter={[8, 8]}>
        {clips.map(() => (
          <Col xs={8} md={8}>
            <Clip />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UserClipList;
