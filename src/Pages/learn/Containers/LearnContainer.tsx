import React, { useState } from "react";
import { Input, Tabs, Divider, Button, Typography } from "antd";
import Searching from "../Components/Searching";
import "../index.css";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";
import BasicCarousel from "../Components/BasicCarousel";
import useClipFeedContext from "../../../Domains/ClipFeed/useClipFeed";

const { Search } = Input;

const LearnContainer = () => {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const {
    userData: { username },
  } = useUserDataContext();
  const { clips } = useClipFeedContext();

  const onSearch = (e: any) => {
    const value = e.target.value;
    setSearchField(value);
    if (value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  return (
    <div id="search-page" className="page-layout">
      <Search
        placeholder="search..."
        allowClear
        value={searchField ?? ""}
        onChange={onSearch}
        onFocus={() => setSearchShow(true)}
        addonAfter={
          searchShow && (
            <Button
              type="text"
              onClick={() => {
                setSearchField("");
                setSearchShow(false);
              }}
            >
              Cancel
            </Button>
          )
        }
      />
      {searchShow ? (
        <Searching searchField={searchField} clips={clips} />
      ) : (
        <div style={{ textAlign: "left", padding: "12px" }}>
          <Typography.Title level={3}>Trending</Typography.Title>
          <BasicCarousel itemList={clips} />
          <Typography.Title level={3}>Recommend</Typography.Title>
          <BasicCarousel itemList={clips} />
          <Typography.Title level={3}>Cooking</Typography.Title>
          <BasicCarousel itemList={clips} />
        </div>
      )}
      <BottomNav username={username} />
    </div>
  );
};

export default LearnContainer;
