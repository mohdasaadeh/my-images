import axios from 'axios';

import { AppDispatch, ImageActionTypes } from '../../redux';

export const createImage = async (
  body: FormData,
  setIsHidden: Function,
  dispatch: AppDispatch,
) => {
  try {
    dispatch({
      type: ImageActionTypes.IMAGE_LOADING,
    });

    const { data } = await axios.post('/api/images/new', body);

    dispatch({
      type: ImageActionTypes.CREATE_IMAGE,
      payload: data,
    });

    setIsHidden(true);
  } catch (error: any) {
    dispatch({
      type: ImageActionTypes.IMAGE_ERROR,
      payload: error.response.data.message,
    });
  }
};
