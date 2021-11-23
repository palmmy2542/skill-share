import { Divider, Tabs } from "antd";
import { AllPlaylist, ClipProp } from "../../../interface";
import SearchClipsTab from "../Components/SearchClipsTab";
import SearchUsersTab from "../Components/SearchUsersTab";
import "../index.css";
import SearchPlaylistTab from "./SearchPlaylistTab";

const SEARCH_TYPE = {
  USERS: "USERS",
  CLIPS: "CLIPS",
  PLAYLISTS: "PLAYLISTS",
};

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

const Searching = ({
  searchField,
  clips,
  users,
  handleOpen,
  handleClickSlide,
  handleSetIsDrag,
  isDrag,
  playlist,
  handleSelectPlaylist,
}: {
  searchField: string;
  users: Array<any>;
  clips: Array<ClipProp>;
  handleOpen: () => void;
  handleClickSlide: (index: number) => void;
  handleSetIsDrag: (state: boolean) => void;
  isDrag: boolean;
  playlist: AllPlaylist[];
  handleSelectPlaylist: ({
    title,
    description,
    id,
    permission,
    videoList,
    userId,
  }: AllPlaylist) => void;
}) => {
  const searchList = (tab: string) => {
    switch (tab) {
      case SEARCH_TYPE.USERS:
        return <SearchUsersTab searchWord={searchField} users={users} />;
      case SEARCH_TYPE.CLIPS:
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
      case SEARCH_TYPE.PLAYLISTS:
        return (
          <SearchPlaylistTab
            searchWord={searchField}
            playlist={playlist}
            handleOpen={handleOpen}
            handleClickSlide={handleClickSlide}
            handleSetIsDrag={handleSetIsDrag}
            isDrag={isDrag}
            handleSelectPlaylist={handleSelectPlaylist}
          />
        );
    }
  };

  return (
    <div>
      <Divider />
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Users" key="1">
          {searchList(SEARCH_TYPE.USERS)}
        </TabPane>
        <TabPane tab="Clips" key="3">
          {searchList(SEARCH_TYPE.CLIPS)}
        </TabPane>
        <TabPane tab="Playlists" key="2">
          {searchList(SEARCH_TYPE.PLAYLISTS)}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Searching;
