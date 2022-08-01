import axios from 'axios';

import { AppDispatch, ImageActionTypes, Image } from '../../redux';

export const deleteImage = async (
  image: Image,
  setIsHidden: Function,
  dispatch: AppDispatch,
) => {
  try {
    dispatch({
      type: ImageActionTypes.IMAGE_LOADING,
    });

    const { data } = await axios.delete(`/api/images/${image.id}/delete`);

    dispatch({
      type: ImageActionTypes.DELETE_IMAGE,
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
