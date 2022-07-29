import React from 'react';

import Navbar from '../components/Navbar';
import { useFetchImagesPaginated } from '../hooks';
import { useTypedSelector } from '../hooks';

const Feed: React.FC = () => {
  const images = useTypedSelector(({ images }) => images.data);
  const loading = useTypedSelector(({ images }) => images.loading);

  const { lastImageElementRef } = useFetchImagesPaginated<HTMLDivElement>();

  return (
    <>
      <Navbar />
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
