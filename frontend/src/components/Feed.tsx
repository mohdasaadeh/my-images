import React, { useState, useRef, useCallback } from 'react';

import { useImage } from '../redux';
import { useTypedSelector } from '../hooks/useTypedSelector';

const Feed: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const images = useTypedSelector(({ images }) => images.data);
  const loading = useTypedSelector(({ images }) => images.loading);

  const { useFetchImagesPaginated } = useImage();

  useFetchImagesPaginated(pageNumber, setHasMore);

  const observer = useRef<any>();

  const lastImageElementRef = useCallback(
    (node: any) => {
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

  return (
    <>
      {images &&
        images.map((image, index) => {
          if (images.length === index + 1) {
            return (
              <div ref={lastImageElementRef} key={image.id}>
                {image.title}
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officiis consequatur minus dignissimos tempore odit
                  necessitatibus perspiciatis, sit error architecto quis
                  obcaecati nulla ullam maxime accusamus neque exercitationem
                  reiciendis asperiores numquam?
                </div>
                <hr />
              </div>
            );
          } else {
            return (
              <div key={image.id}>
                {image.title}
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officiis consequatur minus dignissimos tempore odit
                  necessitatibus perspiciatis, sit error architecto quis
                  obcaecati nulla ullam maxime accusamus neque exercitationem
                  reiciendis asperiores numquam?
                </div>
                <hr />
              </div>
            );
          }
        })}
      <div>{loading && 'Loading...'}</div>
    </>
  );
};

export default Feed;
