import "../index.css";
import { useState } from "react";
import { Input, Tabs, Divider } from "antd";
import SearchUsersTab from "../Components/SearchUsersTab";
import SearchTagsTab from "../Components/SearchTagsTab";
import SearchClipsTab from "../Components/SearchClipsTab";
import { ClipProp } from "../../../interface";

const { Search } = Input;
const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

const Searching = ({
  searchField,
  clips,
  handleOpen,
  handleClickSlide,
  handleSetIsDrag,
  isDrag,
}: {
  searchField: string;
  clips: Array<ClipProp>;
  handleOpen: () => void;
  handleClickSlide: (index: number) => void;
  handleSetIsDrag: (state: boolean) => void;
  isDrag: boolean;
}) => {
  const searchList = (tab: string) => {
    switch (tab) {
      case "Users":
        return <SearchUsersTab searchWord={searchField} />;
      // case "Tags":
      //   return ( <SearchTagsTab searchWord={searchField}/> );
      case "Clips":
        return (
          <SearchClipsTab
            searchWord={searchField}
            clips={clips}
            handleOpen={handleOpen}
            handleClickSlide={handleClickSlide}
            handleSetIsDrag={handleSetIsDrag}
            isDrag={isDrag}
          />
        );
    }
  };

  return (
    <div>
      <Divider />
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Users" key="1">
          {searchList("Users")}
        </TabPane>
        {/* <TabPane disabled tab="Tags" key="2">
          {searchList("Tags")}
        </TabPane> */}
        <TabPane tab="Clips" key="3">
          {searchList("Clips")}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Searching;
