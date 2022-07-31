import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

import {
  UserActionTypes,
  AppDispatch,
  User,
  ImageActionTypes,
  LikedImageActionTypes,
} from '../../redux';

export const editUser = async (
  user: User,
  body: FormData,
  setIsHidden: Function,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
) => {
  try {
    setIsHidden(true);

    const { data } = await axios.patch(`/api/users/${user.id}/edit`, body);

    dispatch({
      type: UserActionTypes.CREATE_USER,
      payload: { id: data.id, username: data.username, image: data.image },
    });
    dispatch({
      type: ImageActionTypes.DELETE_IMAGES_PAGINATED,
    });
    dispatch({
      type: LikedImageActionTypes.DELETE_LIKED_IMAGES_PAGINATED,
    });
  } catch (error: any) {
    dispatch({
      type: UserActionTypes.USER_ERROR,
      payload: error.message,
    });
  }
};
