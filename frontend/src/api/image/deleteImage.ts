import axios from 'axios';

import { AppDispatch, ImageActionTypes, Image } from '../../redux';

export const deleteImage = async (
  image: Image,
  setIsHidden: Function,
  dispatch: AppDispatch,
) => {
  try {
    setIsHidden(true);

    const { data } = await axios.delete(`/api/images/${image.id}/delete`);

    dispatch({
      type: ImageActionTypes.DELETE_IMAGE,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ImageActionTypes.IMAGE_ERROR,
      payload: error.message,
    });
  }
};
