import axios from 'axios';
import { Dispatch } from 'redux';

import { UserActions } from '../actions';
import { UserActionTypes } from '../action-types';

export const checkUser = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    const { data } = await axios.get('/api/users/current-user');

    dispatch({
      type: UserActionTypes.CHECK_USER,
      payload: { id: data.id },
    });
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.USER_ERROR,
      payload: error.message,
    });
  }
};

export const fetchUser =
  (body: { email: string; password: string }) =>
  async (dispatch: Dispatch<UserActions>) => {
    try {
      const { data } = await axios.post('/api/users/signin', body);

      dispatch({
        type: UserActionTypes.FETCH_USER,
        payload: { id: data.id },
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.USER_ERROR,
        payload: error.message,
      });
    }
  };

export const createUser =
  (body: { email: string; password: string }) =>
  async (dispatch: Dispatch<UserActions>) => {
    try {
      const { data } = await axios.post('/api/users/signup', body);

      dispatch({
        type: UserActionTypes.CREATE_USER,
        payload: { id: data.id },
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.USER_ERROR,
        payload: error.message,
      });
    }
  };

export const deleteUser = () => async (dispatch: Dispatch<UserActions>) => {
  try {
    await axios.post('/api/users/signout');

    dispatch({
      type: UserActionTypes.DELETE_USER,
    });
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.USER_ERROR,
      payload: error.message,
    });
  }
};
