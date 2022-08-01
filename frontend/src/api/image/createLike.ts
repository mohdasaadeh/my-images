import axios from 'axios';

import { AppDispatch, ImageActionTypes, Image } from '../../redux';

export const createLike = async (image: Image, dispatch: AppDispatch) => {
  try {
    await axios.post(`/api/image-likes/${image.id}/new`);
  } catch (error: any) {
    dispatch({
      type: ImageActionTypes.IMAGE_ERROR,
      payload: error.response.data.message,
    });
  }
};
