import axios from 'axios';

import { AppDispatch, ImageActionTypes, Image } from '../../redux';

export const deleteLike = async (image: Image, dispatch: AppDispatch) => {
  try {
    await axios.delete(`/api/image-likes/${image.id}/delete`);
  } catch (error: any) {
    dispatch({
      type: ImageActionTypes.IMAGE_ERROR,
      payload: error.response.data.message,
    });
  }
};
