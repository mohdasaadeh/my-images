import { UserActionTypes } from '../action-types';

export interface CheckUserAction {
  type: UserActionTypes.CHECK_USER;
  payload: {
    id: string | number;
  };
}

export interface FetchUserAction {
  type: UserActionTypes.FETCH_USER;
  payload: {
    id: string | number;
  };
}

export interface CreateUserAction {
  type: UserActionTypes.CREATE_USER;
  payload: {
    id: string | number;
  };
}

export interface DeleteUserAction {
  type: UserActionTypes.DELETE_USER;
}

export interface UserErrorAction {
  type: UserActionTypes.USER_ERROR;
  payload: string;
}

export type UserActions =
  | CheckUserAction
  | FetchUserAction
  | CreateUserAction
  | DeleteUserAction
  | UserErrorAction;
