import ImageCard from './ImageCard';
import { useTypedSelector } from '../hooks';
import { useFetchImagesPaginated } from '../hooks';
import { Image } from '../redux';
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
    return images.order
      .sort((a, b) => b - a)
      .map((id) => {
        return images.data.find((likedImage) => likedImage.id === id);
      });
  }) as Image[];
  const error = useTypedSelector(({ images }) => images.error);

  const { lastImageElementRef } =
    useFetchImagesPaginated<HTMLDivElement>(searchTerm);

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

  return (
    <div className="flex justify-around bg-primary">
      <div className="container mx-auto mt-10">
        {renderError()}
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
