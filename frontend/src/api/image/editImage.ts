import axios from 'axios';

import { AppDispatch, ImageActionTypes, Image } from '../../redux';

export const editImage = async (
  image: Image,
  body: FormData,
  setIsHidden: Function,
  dispatch: AppDispatch,
) => {
  try {
    const { data } = await axios.patch(`/api/images/${image.id}/edit`, body);

    dispatch({
      type: ImageActionTypes.EDIT_IMAGE,
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
