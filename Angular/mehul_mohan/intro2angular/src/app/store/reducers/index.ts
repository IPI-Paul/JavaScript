import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "src/app/interfaces/auth";
import { reducer } from "./appReducer";

export const reducers: ActionReducerMap<AppState> = {
  appReducer: reducer
}