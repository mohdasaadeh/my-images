import { useEffect } from 'react';
import axios from 'axios';

import ImageCard from './ImageCard';
import { useTypedSelector, useAppDispatch, useInfiniteScroll } from '../hooks';
import { LikedImageActionTypes } from '../redux';

interface LikedImageCardListProps {
  setIsDeleteImageHidden: Function;
  setIsEditImageHidden: Function;
  setImage: Function;
}

const LikedImageCardList: React.FC<LikedImageCardListProps> = ({
  setIsDeleteImageHidden,
  setIsEditImageHidden,
  setImage,
}) => {
  const user = useTypedSelector(({ user }) => user.data);
  const loading = useTypedSelector(({ likedImages }) => likedImages.loading);
  const likedImages = useTypedSelector(({ likedImages }) => {
    return likedImages.data;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: LikedImageActionTypes.DELETE_LIKED_IMAGES_PAGINATED,
    });
  }, []);

  const { lastImageElementRef, scrollData, scrollError, scrollLoading } =
    useInfiniteScroll<HTMLDivElement>(
      (canceller: AbortController, pageNumber: number) => {
        return axios.get('/api/images/recently-liked', {
          params: { page: pageNumber, limit: 5 },
          signal: canceller.signal,
        });
      },
      likedImages,
    );

  useEffect(() => {
    if (scrollData)
      dispatch({
        type: LikedImageActionTypes.FETCH_LIKED_IMAGES_PAGINATED,
        payload: scrollData,
      });

    if (scrollError)
      dispatch({
        type: LikedImageActionTypes.LIKED_IMAGE_ERROR,
        payload: scrollError,
      });

    if (scrollLoading)
      dispatch({ type: LikedImageActionTypes.LIKED_IMAGE_LOADING });
  }, [scrollData, scrollLoading, scrollError]);

  const renderLikedImageCards = () => {
    if (!likedImages.length || !user.id || user.id === 'out') return null;

    return likedImages.map((likedImage, index) => {
      if (likedImages.length === index + 1) {
        return (
          <div
            key={likedImage && likedImage.id}
            ref={lastImageElementRef}
            className="container mx-auto px-20"
          >
            <ImageCard
              image={likedImage}
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
            key={likedImage && likedImage.id}
            ref={lastImageElementRef}
            className="container mx-auto px-20"
          >
            <ImageCard
              image={likedImage}
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

  return (
    <div className="flex justify-around bg-primary mt-5 mx-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="flex flex-col justify-center text-6xl rounded-xl p-6">
            {renderLikedImageCards()}
          </div>
          <div>{loading && 'Loading...'}</div>
        </div>
      </div>
    </div>
  );
};

export default LikedImageCardList;
