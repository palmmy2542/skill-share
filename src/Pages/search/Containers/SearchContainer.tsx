import "../index.css";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import Search from "./Searching";

const SearchContainer = (props: any) => {
  return (
    <>
      <div id="search-page" className="page-layout">
        <Search/>
      </div>
      <BottomNav />
    </>
  );
};

export default SearchContainer;