import { Divider, Input, Tabs } from "antd";
import usePlaylistContext from "../../../Domains/Playlist/usePlaylist";
import { ClipProp } from "../../../interface";
import SearchClipsTab from "../Components/SearchClipsTab";
import SearchUsersTab from "../Components/SearchUsersTab";
import "../index.css";
import SearchPlaylistTab from "./SearchPlaylistTab";

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
  const { playlist } = usePlaylistContext();

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
      case "PLAYLIST":
        return (
          <SearchPlaylistTab
            searchWord={searchField}
            playlist={playlist}
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
        <TabPane tab="Clips" key="3">
          {searchList("Clips")}
        </TabPane>
        <TabPane tab="Playlists" key="2">
          {searchList("PLAYLIST")}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Searching;
