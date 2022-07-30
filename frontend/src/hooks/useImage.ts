import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Image, ImageActionTypes } from '../redux';
import { AppDispatch } from '../redux';

const useAppDispatch: () => AppDispatch = useDispatch;

export const useImage = () => {
  const dispatch = useAppDispatch();

  const createImage = async (body: FormData, setIsHidden: Function) => {
    try {
      const { data } = await axios.post('/api/images/new', body);

      dispatch({
        type: ImageActionTypes.CREATE_IMAGE,
        payload: data,
      });

      setIsHidden(true);
    } catch (error: any) {
      dispatch({
        type: ImageActionTypes.IMAGE_ERROR,
        payload: error.message,
      });
    }
  };

  const editImage = async (
    image: Image,
    body: FormData,
    setIsHidden: Function,
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
        payload: error.message,
      });
    }
  };

  const deleteImage = async (image: Image, setIsHidden: Function) => {
    try {
      const { data } = await axios.delete(`/api/images/${image.id}/delete`);

      dispatch({
        type: ImageActionTypes.DELETE_IMAGE,
        payload: data,
      });

      setIsHidden(true);
    } catch (error: any) {
      dispatch({
        type: ImageActionTypes.IMAGE_ERROR,
        payload: error.message,
      });
    }
  };

  return {
    createImage,
    editImage,
    deleteImage,
  };
};
