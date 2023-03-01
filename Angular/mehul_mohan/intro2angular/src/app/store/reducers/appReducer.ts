import { appReducerState } from "src/app/interfaces/auth"
import { ACTION_LOGIN, ACTION_LOGOUT } from "../actions/app.actions"

const initialState: appReducerState = {
  login: true,
  user: 'mehul'
}

export function reducer(state = initialState, action: any) {
  switch(action.type) {
    case ACTION_LOGOUT: 
      return {
        ...state,
        login: false
      }
    case ACTION_LOGIN:
      return {
        ...state,
        login: true
      }
  };
  return state;
}