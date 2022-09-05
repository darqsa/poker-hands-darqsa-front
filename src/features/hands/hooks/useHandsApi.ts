import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetHandData } from "../models/Hand";
import { loadHandsActionCreator } from "../slices/handsSlice";

export const apiURL = process.env.REACT_APP_API_URL;

const useHandsApi = () => {
  const dispatch = useAppDispatch();
  const hands = useAppSelector((state) => state.hands);

  const loadHands = useCallback(async () => {
    const { data }: AxiosResponse<GetHandData[]> = await axios.get(
      `${apiURL}hands`
    );

    dispatch(loadHandsActionCreator(data));
  }, [dispatch]);

  return { hands, loadHands };
};
export default useHandsApi;
