import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

import { UserActionTypes, AppDispatch } from '../../redux';

export const fetchUser = async (
  body: { email: string; password: string },
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => {
  try {
    const { data } = await axios.post('/api/users/signin', body);

    dispatch({
      type: UserActionTypes.FETCH_USER,
      payload: { id: data.id, username: data.username, image: data.image },
    });

    navigate('/');
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.USER_ERROR,
      payload: error.response.data.message,
    });
  }
};
