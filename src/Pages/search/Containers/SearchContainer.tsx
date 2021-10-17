import "../index.css";
import BottomNav from "../../../Components/BottomNav/BottomNav";
import Search from "./Searching";
import useUserDataContext from "../../../Domains/UserData/useUserDataContext";

const SearchContainer = (props: any) => {
  const {
    userData: { username },
  } = useUserDataContext();

  return (
    <>
      <div id="search-page" className="page-layout">
        <Search />
      </div>
      <BottomNav username={username} />
    </>
  );
};

export default SearchContainer;