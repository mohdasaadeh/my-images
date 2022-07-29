import { UserActionTypes } from '../action-types';
import { User } from '../types';

export interface CheckUserAction {
  type: UserActionTypes.CHECK_USER;
  payload: User;
}

export interface FetchUserAction {
  type: UserActionTypes.FETCH_USER;
  payload: User;
}

export interface CreateUserAction {
  type: UserActionTypes.CREATE_USER;
  payload: User;
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
