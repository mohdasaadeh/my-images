import ImageCard from './ImageCard';
import { useTypedSelector } from '../hooks';
import { useFetchImagesPaginated } from '../hooks';

interface ImageCardListProps {
  setIsDeleteImageHidden: Function;
  setImageId: Function;
}

const ImageCardList: React.FC<ImageCardListProps> = ({
  setIsDeleteImageHidden,
  setImageId,
}) => {
  const user = useTypedSelector(({ user }) => user.data);
  const images = useTypedSelector(({ images }) => images.data);
  const loading = useTypedSelector(({ images }) => images.loading);

  const { lastImageElementRef } = useFetchImagesPaginated<HTMLDivElement>();

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
              setImageId={setImageId}
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
              setImageId={setImageId}
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
            {renderImageCards()}
          </div>
          <div>{loading && 'Loading...'}</div>
        </div>
      </div>
    </div>
  );
};

export default ImageCardList;
