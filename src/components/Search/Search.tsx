import { useState } from "react";
import SearchStyled from "./SearchStyled";

const Search = (): JSX.Element => {
  const initialState = "";
  let [searchText, setSearchText] = useState(initialState);

  const onChangeSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <SearchStyled
      placeholder="Search by hand name"
      type="text"
      className="search-input"
      autoComplete="off"
      onChange={onChangeSearchData}
      value={searchText}
    />
  );
};
export default Search;
