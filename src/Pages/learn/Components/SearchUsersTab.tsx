import { Avatar, Col, Row } from "antd";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import "../index.css";

const SearchUsersTab = ({ searchWord }: { searchWord: string }) => {
  const { clips } = useClipFeedContext();
  const filteredUsers = clips.filter((user) => {
    return user.name.toLowerCase().includes(searchWord.toLowerCase());
  });
  return (
    <div id="search-users">
      {filteredUsers.map((user, index) => (
        <Row justify="start" style={{ paddingLeft: "5%" }} key={index}>
          <Col style={{ paddingRight: "1%" }}>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </Col>
          <Col>
            <h3>{user.name}</h3>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default SearchUsersTab;
