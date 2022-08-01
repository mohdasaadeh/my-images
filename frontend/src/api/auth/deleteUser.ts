import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

import { AppDispatch, UserActionTypes } from '../../redux';

export const deleteUser = async (
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => {
  try {
    await axios.post('/api/users/signout');

    dispatch({
      type: UserActionTypes.DELETE_USER,
    });

    navigate('/signin');
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.USER_ERROR,
      payload: error.message,
    });
  }
};
