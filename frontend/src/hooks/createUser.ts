import axios from 'axios';

import { UserActionTypes } from '../redux';

export const createUser = async (
  body: {
    username: string;
    email: string;
    password: string;
  },
  dispatch: any,
  navigate: any,
) => {
  console.log(body);
  try {
    const { data } = await axios.post('/api/users/signup', body);

    dispatch({
      type: UserActionTypes.CREATE_USER,
      payload: { id: data.id, username: data.username, image: data.image },
    });

    navigate('/');
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.USER_ERROR,
      payload: error.message,
    });
  }
};
