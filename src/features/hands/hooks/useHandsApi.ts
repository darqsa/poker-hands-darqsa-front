import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetHands, HandData } from "../models/Hand";
import {
  deleteHandActionCreator,
  loadHandsActionCreator,
} from "../slices/handsSlice";

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

  const createHand = async (hand: HandData) => {
    const response: AxiosResponse<string> = await axios.post(
      `${apiURL}hands/create`,
      hand,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteHand = async (id: string) => {
    await axios.delete(`${apiURL}hands/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(deleteHandActionCreator(id));
  };

  return { hands, loadHands, createHand, deleteHand };
};
export default useHandsApi;
