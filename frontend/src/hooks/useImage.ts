import { useDispatch } from 'react-redux';
import axios from 'axios';

import { ImageActionTypes } from '../redux';
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

  const deleteImage = async (id: number, setIsHidden: Function) => {
    try {
      const { data } = await axios.delete(`/api/images/${id}/delete`);

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
    deleteImage,
  };
};
