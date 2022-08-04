import { useEffect } from 'react';
import axios from 'axios';

import ImageCard from './ImageCard';
import { useTypedSelector, useAppDispatch, useInfiniteScroll } from '../hooks';
import { ImageActionTypes } from '../redux';
import ErrorBanner from './ErrorBanner';

interface ImageCardListProps {
  setIsDeleteImageHidden: Function;
  setIsEditImageHidden: Function;
  setImage: Function;
  searchTerm: { value: string };
}

const ImageCardList: React.FC<ImageCardListProps> = ({
  setIsDeleteImageHidden,
  setIsEditImageHidden,
  setImage,
  searchTerm,
}) => {
  const user = useTypedSelector(({ user }) => user.data);
  const loading = useTypedSelector(({ images }) => images.loading);
  const images = useTypedSelector(({ images }) => {
    return images.data;
  });
  const error = useTypedSelector(({ images }) => images.error);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: ImageActionTypes.DELETE_IMAGES_PAGINATED,
    });
  }, []);

  const { lastImageElementRef, scrollData, scrollError, scrollLoading } =
    useInfiniteScroll<HTMLDivElement>(
      (
        canceller: AbortController,
        pageNumber: number,
        term: { value: string },
      ) => {
        return axios.get('/api/images', {
          params: { page: pageNumber, limit: 5, term: term.value },
          signal: canceller.signal,
        });
      },
      images,
      searchTerm,
    );

  useEffect(() => {
    if (scrollData)
      dispatch({
        type: ImageActionTypes.FETCH_IMAGES_PAGINATED,
        payload: scrollData,
      });

    if (scrollError)
      dispatch({
        type: ImageActionTypes.IMAGE_ERROR,
        payload: scrollError,
      });

    if (scrollLoading) dispatch({ type: ImageActionTypes.IMAGE_LOADING });
  }, [scrollData, scrollLoading, scrollError]);

  const renderError = () => {
    if (!error) return null;

    window.scrollTo(0, 0);

    return (
      <div className="my-4">
        <ErrorBanner error={error} />
      </div>
    );
  };

  const renderImageCards = () => {
    if (!images.length || !user.id || user.id === 'out') return null;

    return images.map((image, index) => {
      if (images.length === index + 1) {
        return (
          <div
            key={image.id}
            ref={lastImageElementRef}
            className="container mx-auto px-20"
          >
            <ImageCard
              image={image}
              user={user}
              setIsDeleteImageHidden={setIsDeleteImageHidden}
              setIsEditImageHidden={setIsEditImageHidden}
              setImage={setImage}
            />
          </div>
        );
      } else {
        return (
          <div
            key={image.id}
            ref={lastImageElementRef}
            className="container mx-auto px-20"
          >
            <ImageCard
              image={image}
              user={user}
              setIsDeleteImageHidden={setIsDeleteImageHidden}
              setIsEditImageHidden={setIsEditImageHidden}
              setImage={setImage}
            />
          </div>
        );
      }
    });
  };

  return images && images.length > 0 ? (
    <div className="flex justify-around bg-primary mt-5 mx-4">
      <div className="container mx-auto">
        {renderError()}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="flex flex-col justify-center text-6xl rounded-xl p-6">
            {renderImageCards()}
          </div>
          <div>{loading && 'Loading...'}</div>
        </div>
      </div>
    </div>
  ) : (
    <h1>No images</h1>
  );
};

export default ImageCardList;
