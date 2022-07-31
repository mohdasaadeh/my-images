import ImageCard from './ImageCard';
import { useTypedSelector } from '../hooks';
import { useFetchLikedImagesPaginated } from '../hooks';
import { Image } from '../redux';

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
    return likedImages.order
      .sort((a, b) => b - a)
      .map((likeDate) => {
        return likedImages.data.find(
          (likedImage) => likedImage.likes.currentUserLikeDate === likeDate,
        );
      });
  }) as Image[];

  const { lastImageElementRef } =
    useFetchLikedImagesPaginated<HTMLDivElement>();

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
    <div className="flex justify-around bg-primary">
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
