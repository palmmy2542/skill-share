import React, { useState } from "react";
import { Input, Tabs, Divider, Button } from "antd";
import Searching from "../Components/Searching";
import "../index.css";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";

const { Search } = Input;

const LearnContainer = () => {
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  const {
    userData: { username },
  } = useUserDataContext();

  const onSearch = (e: any) => {
    const value = e.target.value;
    setSearchField(value);
    if (value === "") {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
    console.log(value);
  };

  return (
    <div id="search-page" className="page-layout">
      <Search
        placeholder="search..."
        allowClear
        value={searchField ?? ""}
        onChange={onSearch}
        onFocus={() => setSearchShow(true)}
        // onBlur={() => setSearchShow(false)}
        addonAfter={
          <Button
            type="text"
            onClick={() => {
              setSearchField("");
              setSearchShow(false);
            }}
          >
            Cancel
          </Button>
        }
      />
      {searchShow && <Searching searchField={searchField} />}
      <BottomNav username={username} />
    </div>
  );
};

export default LearnContainer;
