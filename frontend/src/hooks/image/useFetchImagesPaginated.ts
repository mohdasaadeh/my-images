import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ImageActionTypes } from '../../redux';
import { AppDispatch } from '../../redux';
import { useTypedSelector } from '../useTypedSelector';

const useAppDispatch: () => AppDispatch = useDispatch;

export const useFetchImagesPaginated = <T>(term: { value: string }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loading = useTypedSelector(({ images }) => images.loading);
  const user = useTypedSelector(({ user }) => user.data);

  const observer = useRef<any>();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const lastImageElementRef = useCallback(
    (node: T) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  useEffect(() => {
    const canceller = new AbortController();

    if (user.id && user.id === 'out') {
      navigate('/signin');
    } else if (user.id && user.id !== 'out') {
      dispatch({ type: ImageActionTypes.IMAGE_LOADING });

      axios
        .get('/api/images', {
          params: { page: pageNumber, limit: 10, term: term.value },
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
          if (error.name !== 'CanceledError')
            dispatch({
              type: ImageActionTypes.IMAGE_ERROR,
              payload: error.response.data.message,
            });
        });
    }

    return () => canceller.abort();
  }, [pageNumber, user, term]);

  return { lastImageElementRef };
};
