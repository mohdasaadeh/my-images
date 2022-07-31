import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

import { AppDispatch, ImageActionTypes } from '../../redux';

export const createImage = async (
  body: FormData,
  setIsHidden: Function,
  dispatch: AppDispatch,
) => {
  try {
    setIsHidden(true);

    const { data } = await axios.post('/api/images/new', body);

    dispatch({
      type: ImageActionTypes.CREATE_IMAGE,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ImageActionTypes.IMAGE_ERROR,
      payload: error.message,
    });
  }
};
