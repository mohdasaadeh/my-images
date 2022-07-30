import ReactDOM from 'react-dom';

import { useImage } from '../hooks';
import { Image } from '../redux';

interface DeleteImageProps {
  isHidden: boolean;
  setIsHidden: Function;
  image: Image;
}

const DeleteImage: React.FC<DeleteImageProps> = ({
  isHidden,
  setIsHidden,
  image,
}) => {
  const { deleteImage } = useImage();

  return ReactDOM.createPortal(
    <div
      className={`${
        isHidden && 'hidden'
      } treact-popup fixed inset-0 flex items-center justify-center bg-info-background`}
    >
      <div className="max-w-lg p-8 sm:pb-4 bg-white rounded shadow-lg text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 flex flex-col sm:flex-row items-center">
          Image Delete
        </h3>
        <p className="mt-2">Are you sure that you want to delete this image?</p>
        <div className="mt-8 pt-8 sm:pt-4 border-t -mx-8 px-8 flex sm:flex-row justify-between leading-relaxed">
          <button
            onClick={() => {
              if (image) {
                deleteImage(image, setIsHidden);

                setIsHidden(true);
              }
            }}
            className="mx-2 px-6 py-2 text-white rounded-full bg-secondary hover:bg-primary hover:text-secondary focus:outline-none transition duration-700 ease-in-out border border-slate-400 border-secondary mt-2"
          >
            Delete
          </button>
          <button
            onClick={() => setIsHidden(true)}
            className="mx-2 px-6 py-2 text-white rounded-full bg-secondary hover:bg-primary hover:text-secondary focus:outline-none transition duration-700 ease-in-out border border-slate-400 border-secondary mt-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal')!,
  );
};

export default DeleteImage;
