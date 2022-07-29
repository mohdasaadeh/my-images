import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { UserActionTypes } from '../redux';
import { AppDispatch } from '../redux';

const useAppDispatch: () => AppDispatch = useDispatch;

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const { data } = await axios.get('/api/users/current-user');

      dispatch({
        type: UserActionTypes.CHECK_USER,
        payload: { id: data.id, username: data.username },
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.USER_ERROR,
        payload: error.message,
      });
    }
  };

  const fetchUser = async (body: { email: string; password: string }) => {
    try {
      const { data } = await axios.post('/api/users/signin', body);

      dispatch({
        type: UserActionTypes.FETCH_USER,
        payload: { id: data.id, username: data.username },
      });

      navigate('/images');
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.USER_ERROR,
        payload: error.message,
      });
    }
  };

  const createUser = async (body: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await axios.post('/api/users/signup', body);

      dispatch({
        type: UserActionTypes.CREATE_USER,
        payload: { id: data.id, username: data.username },
      });

      navigate('/images');
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

      navigate('/users/signin');
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
    deleteUser,
  };
};
