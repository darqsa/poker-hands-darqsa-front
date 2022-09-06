import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetHands } from "../models/Hand";
import { loadHandsActionCreator } from "../slices/handsSlice";

export const apiURL = process.env.REACT_APP_API_URL;

const useHandsApi = () => {
  const dispatch = useAppDispatch();
  const hands = useAppSelector((state) => state.hands);
  const token = useAppSelector((state) => state.user.token);

  const loadHands = useCallback(async () => {
    const {
      data: { hands },
    }: AxiosResponse<GetHands> = await axios.get(`${apiURL}hands`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(loadHandsActionCreator(hands));
  }, [dispatch, token]);

  return { hands, loadHands };
};
export default useHandsApi;
