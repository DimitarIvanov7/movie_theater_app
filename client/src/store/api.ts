import { createAction } from "@reduxjs/toolkit";
import { ActionRequestConfing } from "../types";

export const apiCallBegan = createAction(
  "api/callBegan",
  (payload: ActionRequestConfing) => ({
    payload,
  })
);
