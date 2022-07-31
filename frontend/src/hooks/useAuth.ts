import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { UserActionTypes } from '../redux';
import { AppDispatch } from '../redux';
import { fetchUser, createUser, editUser } from '../api/auth';

const useAppDispatch: () => AppDispatch = useDispatch;

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkUser = async () => {
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

  const deleteUser = async () => {
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

  return {
    checkUser,
    fetchUser,
    createUser,
    editUser,
    deleteUser,
  };
};
