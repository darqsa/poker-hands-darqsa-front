import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeLoadingActionCreator,
  openLoadingActionCreator,
} from "../../ui/slices/uiSlice";
import { GetHands } from "../models/Hand";
import {
  deleteHandActionCreator,
  loadHandsActionCreator,
} from "../slices/handsSlice";

export const apiURL = process.env.REACT_APP_API_URL;

const useHandsApi = () => {
  const dispatch = useAppDispatch();
  let hands = useAppSelector((state) => state.hands);
  const token = useAppSelector((state) => state.user.token);

  const loadHands = useCallback(async () => {
    dispatch(openLoadingActionCreator());

    const {
      data: { userHands },
    }: AxiosResponse<GetHands> = await axios.get(`${apiURL}hands`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(closeLoadingActionCreator());
    dispatch(loadHandsActionCreator(userHands));
  }, [dispatch, token]);

  const createHand = async (hand: FormData) => {
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

  const editHand = useCallback(
    async (hand: FormData, id: string) => {
      const response: AxiosResponse<string> = await axios.put(
        `${apiURL}hands/edit/${id}`,
        hand,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
    [token]
  );

  const deleteHand = async (id: string) => {
    await axios.delete(`${apiURL}hands/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(deleteHandActionCreator(id));
  };

  const loadHandById = useCallback(
    async (id: string) => {
      const { data: hand } = await axios.get(`${apiURL}hands/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return hand;
    },
    [token]
  );

  const searchHandByHandName = useCallback(
    async (handName: string) => {
      dispatch(openLoadingActionCreator());
      const {
        data: { userHands },
      } = await axios.get(`${apiURL}hands/${handName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(closeLoadingActionCreator());

      dispatch(loadHandsActionCreator(userHands));
    },
    [token, dispatch]
  );

  return {
    hands,
    loadHands,
    createHand,
    editHand,
    deleteHand,
    loadHandById,
    searchHandByHandName,
  };
};
export default useHandsApi;
