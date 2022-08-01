import axios from 'axios';

import { AppDispatch, UserActionTypes } from '../../redux';

export const checkUser = async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.get('/api/users/current-user');

    dispatch({
      type: UserActionTypes.CHECK_USER,
      payload: { id: data.id, username: data.username, image: data.image },
    });
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.USER_ERROR,
      payload: error.message,
    });
  }
};
