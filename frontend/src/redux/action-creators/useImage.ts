import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ImageActionTypes } from '../action-types';
import type { AppDispatch } from '../store';

const useAppDispatch: () => AppDispatch = useDispatch;

export const useImage = () => {
  const dispatch = useAppDispatch();

  const useFetchImagesPaginated = (
    pageNumber: number,
    setHasMore: Function,
  ) => {
    useEffect(() => {
      const canceller = new AbortController();

      dispatch({ type: ImageActionTypes.IMAGE_LOADING });

      axios
        .get('/api/images', {
          params: { page: pageNumber, limit: 20 },
          signal: canceller.signal,
        })
        .then((res) => {
          dispatch({
            type: ImageActionTypes.FETCH_IMAGES_PAGINATED,
            payload: res.data.items,
          });

          setHasMore(res.data.links.next);
        })
        .catch((error) => {
          dispatch({ type: ImageActionTypes.IMAGE_ERROR, payload: error });
        });

      return () => canceller.abort();
    }, [pageNumber]);
  };

  return {
    useFetchImagesPaginated,
  };
};
