import { Avatar, List } from "antd";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";
import "../index.css";

const SearchUsersTab = ({ searchWord }: { searchWord: string }) => {
  const { clips } = useClipFeedContext();
  const filteredUsers = clips.filter((user) => {
    return user.name.toLowerCase().includes(searchWord.toLowerCase());
  });
  return (
    <div id="search-users">
      <List
        size="large"
        itemLayout="horizontal"
        dataSource={filteredUsers}
        style={{ textAlign: "left" }}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{user.name[0]}</Avatar>}
              title={<a href="https://ant.design">{user.name}</a>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default SearchUsersTab;
