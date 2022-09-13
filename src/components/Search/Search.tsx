import { SyntheticEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import useHandsApi from "../../features/hands/hooks/useHandsApi";
import { closeLoadingActionCreator } from "../../features/ui/slices/uiSlice";
import ButtonStyled from "../../styles/components/ButtonStyled";
import SearchStyled from "./SearchStyled";

const Search = (): JSX.Element => {
  const initialState = "";
  let [searchText, setSearchText] = useState(initialState);
  const { searchHandByHandName, loadHands } = useHandsApi();
  const [isThereResult, setIsThereResult] = useState("");
  const dispatch = useAppDispatch();

  const onChangeSearchData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsThereResult("");
    setSearchText(event.target.value);
  };

  const onSubmitData = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await searchHandByHandName(searchText);
      setIsThereResult("result");
    } catch (error) {
      dispatch(closeLoadingActionCreator());
      setIsThereResult("no-result");
    }
  };

  const returnToList = () => {
    loadHands();
    setIsThereResult("");
    setSearchText(initialState);
  };

  const emptyField = searchText === "";
  return (
    <>
      <SearchStyled className="form" onSubmit={onSubmitData}>
        {isThereResult === "no-result" && (
          <span className="form__no-hands-text">
            There are no hands with this hand name.
          </span>
        )}
        <input
          placeholder="Search by name"
          type="text"
          className={`form__input ${
            isThereResult === "no-result" ? "form__input--no-results" : ""
          }`}
          autoComplete="off"
          onChange={onChangeSearchData}
          value={searchText}
        />
        {isThereResult === "result" ? (
          <div className="form__button-container">
            <ButtonStyled onClick={returnToList} className="form__button">
              {" "}
              Return{" "}
            </ButtonStyled>
            <ButtonStyled
              className="form__button"
              type="submit"
              disabled={emptyField}
            >
              Search
            </ButtonStyled>
          </div>
        ) : (
          <ButtonStyled
            className="form__button"
            type="submit"
            disabled={emptyField}
          >
            Search
          </ButtonStyled>
        )}
      </SearchStyled>
    </>
  );
};
export default Search;
