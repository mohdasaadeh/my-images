import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { ImageActionTypes } from '../../redux';
import { AppDispatch } from '../../redux';
import { useTypedSelector } from '../useTypedSelector';

const useAppDispatch: () => AppDispatch = useDispatch;

export const useFetchImagesPaginated = <T>() => {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loading = useTypedSelector(({ images }) => images.loading);

  const observer = useRef<any>();

  const dispatch = useAppDispatch();

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

  return { lastImageElementRef };
};
