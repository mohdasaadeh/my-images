import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTypedSelector } from './useTypedSelector';

export const useInfiniteScroll = <T>(
  fetchCallback: Function,
  term?: { value: string },
) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(true);
  const [scrollData, setScrollData] = useState(null);
  const [scrollError, setScrollError] = useState(null);

  const user = useTypedSelector(({ user }) => user.data);

  const navigate = useNavigate();

  const observer = useRef<any>();

  const lastImageElementRef = useCallback(
    (node: T) => {
      if (scrollLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [scrollLoading, hasMore],
  );

  useEffect(() => {
    const canceller = new AbortController();

    if (user.id && user.id === 'out') {
      navigate('/signin');
    } else if (user.id && user.id !== 'out') {
      const fetchCallbackPromise = term
        ? fetchCallback(canceller, pageNumber, term)
        : fetchCallback(canceller, pageNumber);

      fetchCallbackPromise
        .then((res: any) => {
          setScrollData(res.data.items);
          setHasMore(res.data.links.next);
        })
        .catch((error: any) => {
          if (error.name !== 'CanceledError')
            setScrollError(error.response.data.message);
        })
        .finally(() => {
          setScrollLoading(false);
        });
    }

    return () => canceller.abort();
  }, [pageNumber, term, user]);

  return { lastImageElementRef, scrollData, scrollError, scrollLoading };
};
