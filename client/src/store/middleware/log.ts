import { AnyAction, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";

interface MyMiddlewareAPI extends MiddlewareAPI {}

const log =
  (store: MyMiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    // console.log(action);
    next(action);
  };

export default log;
