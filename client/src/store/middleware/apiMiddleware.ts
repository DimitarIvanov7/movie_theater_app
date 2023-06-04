import { AnyAction, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import { settings } from "@/src/utils/settings";
import axios from "axios";
import { AuthType } from "@/src/types";
import { logout, refresh } from "../authSlice";

interface MyMiddlewareAPI extends MiddlewareAPI {}

const api =
  ({ dispatch }: MyMiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  async (action: AnyAction) => {
    if (action?.type !== apiCallBegan?.type) return next(action);

    const {
      url,
      method = "GET",
      data,
      onStart,
      onSuccess,
      onError,
      authorization,
    } = action.payload;

    const requestData = {
      headers: {
        Authorization: authorization
          ? `Bearer ${authorization.refreshToken}`
          : "",
      },
      baseURL: settings.baseUrl,
      url,
      method,
      data,
    };

    try {
      const response = await axios.request(requestData);
      onStart && dispatch({ type: onStart });
      dispatch({ type: onSuccess, payload: response.data });
    } catch (error: any) {
      if (
        error.response.status === 403 &&
        Object.keys(authorization).length > 0
      ) {
        try {
          const newTokens = await axios.post(
            `${settings.baseUrl}/${AuthType.Refresh}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${authorization.refreshToken}`,
              },
            }
          );

          dispatch({
            type: refresh.type,
            payload: newTokens,
          });

          const response = await axios.request(requestData);
          dispatch({ type: onSuccess, payload: response.data });

          return next(action);
        } catch (error) {
          dispatch({
            type: logout.type,
          });

          return next(action);
        }
      }

      dispatch({
        type: onError,
        payload: { error: error?.response?.data?.message || error.message },
      });
    }
  };

export default api;
