import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Image, ImageActionTypes } from '../redux';
import { AppDispatch } from '../redux';

const useAppDispatch: () => AppDispatch = useDispatch;

export const useImage = () => {
  const dispatch = useAppDispatch();

  const createImage = async (body: FormData, setIsHidden: Function) => {
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

  const editImage = async (
    image: Image,
    body: FormData,
    setIsHidden: Function,
  ) => {
    try {
      setIsHidden(true);

      const { data } = await axios.patch(`/api/images/${image.id}/edit`, body);

      dispatch({
        type: ImageActionTypes.EDIT_IMAGE,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ImageActionTypes.IMAGE_ERROR,
        payload: error.message,
      });
    }
  };

  const deleteImage = async (image: Image, setIsHidden: Function) => {
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

  const createLike = async (image: Image) => {
    try {
      await axios.post(`/api/image-likes/${image.id}/new`);
    } catch (error: any) {
      dispatch({
        type: ImageActionTypes.IMAGE_ERROR,
        payload: error.message,
      });
    }
  };

  const deleteLike = async (image: Image) => {
    try {
      await axios.delete(`/api/image-likes/${image.id}/delete`);
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
    createLike,
    deleteLike,
  };
};
