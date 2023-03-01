export interface appReducerState {
  login: boolean,
  user?: string
}

export interface AppState {
  appReducer: appReducerState
}

export interface Auth {
  success: boolean,
  username?: string,
  message?: string,
  secret?: string
}

export interface isLoggedIn {
  status: boolean
}

export interface logoutStatus {
  success: boolean
}

export interface objData {
  obj: Object
}

export interface quoteStatus {
  success: boolean,
  message?: string
}

export interface registerResponse {
  success: boolean,
  message?: string
}

export interface userData {
  status: boolean,
  username: string,
  quote: string
}