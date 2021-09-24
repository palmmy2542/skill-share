import React from "react";
import { Row, Col, Tabs } from "antd";
import { ImFilm, ImLock } from "react-icons/im";
const { TabPane } = Tabs;

const UserClipList = (props: any) => {
  return (
    <>
      <Row>
        <Col span={24}>
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
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};

export default UserClipList;
