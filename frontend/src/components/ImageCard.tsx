import { useState } from 'react';

import { Image, User, LikedImageActionTypes } from '../redux';
import { createLike, deleteLike } from '../api';
import { useAppDispatch } from '../hooks';

interface ImageCardProps {
  image: Image;
  user: User;
  setIsDeleteImageHidden: Function;
  setIsEditImageHidden: Function;
  setImage: Function;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  user,
  setIsDeleteImageHidden,
  setIsEditImageHidden,
  setImage,
}) => {
  const [isLiked, setIsLiked] = useState(image.likes.likedByCurrentUser);
  const [likesCount, setLikesCount] = useState(image.likes.imageLikesCount);

  const dispatch = useAppDispatch();

  const renderLikeButton = () => {
    if (isLiked) {
      return (
        <button
          type="button"
          title="Dislike image"
          className="flex items-center justify-center"
          onClick={() => {
            setIsLiked(!isLiked);
            setLikesCount(likesCount - 1);

            deleteLike(image, dispatch);

            dispatch({
              type: LikedImageActionTypes.DELETE_LIKED_IMAGE,
              payload: image,
            });
          }}
        >
          <svg
            className="h-5 w-5 text-black fill-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
        </button>
      );
    } else {
      return (
        <button
          type="button"
          title="Like image"
          className="flex items-center justify-center"
          onClick={() => {
            setIsLiked(!isLiked);
            setLikesCount(likesCount + 1);

            createLike(image, dispatch);

            image.likes.currentUserLikeDate = Date.now();

            dispatch({
              type: LikedImageActionTypes.CREATE_LIKED_IMAGE,
              payload: image,
            });
          }}
        >
          <svg
            className="h-5 w-5 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
        </button>
      );
    }
  };

  return (
    <div className="p-3 px-6 min-h-48 flex justify-center items-center">
      <div>
        <div className="rounded-md shadow-md w-96 sm:w-96 bg-white text-coolGray-100">
          <div className="flex items-center justify-start p-3">
            <div className="flex space-x-2">
              <img
                src={image && image.user && image.user.image}
                alt=""
                className="object-cover object-center w-8 h-8 rounded-full shadow-sm bg-coolGray-500 border-coolGray-700"
              />
              <div>
                <p className="text-sm">
                  {image && image.user && image.user.username}
                </p>
                <p className="text-xs mt-1 text-coolGray-100">
                  {image && image.title}
                </p>
              </div>
            </div>
          </div>
          <img
            src={image && image.url}
            alt=""
            className="object-cover object-center w-full h-72 bg-coolGray-500"
          />
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {renderLikeButton()}
                <span className="text-sm">
                  <span className="font-semibold">
                    {likesCount === 0 ? '' : likesCount}
                  </span>
                </span>
                <button
                  type="button"
                  title="Download image"
                  className="flex items-center justify-center"
                  onClick={async () => {
                    if (image) {
                      const downloadImage = await fetch(image.url);
                      const downloadImageBlog = await downloadImage.blob();
                      const downloadImageURL =
                        URL.createObjectURL(downloadImageBlog);

                      const link = document.createElement('a');
                      link.href = downloadImageURL;
                      link.download = image.title;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }
                  }}
                >
                  <svg
                    className="h-5 w-5 text-black"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                    <polyline points="7 11 12 16 17 11" />
                    <line x1="12" y1="4" x2="12" y2="16" />
                  </svg>
                </button>
              </div>
              {image && image.user && user.id === image.user.id && (
                <div className="flex space-x-3">
                  <button
                    type="button"
                    title="Edit image"
                    onClick={() => {
                      setIsEditImageHidden(false);

                      setImage(image);
                    }}
                  >
                    <svg
                      className="h-5 w-5 text-black"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    title="Delete image"
                    onClick={() => {
                      setIsDeleteImageHidden(false);

                      setImage(image);
                    }}
                  >
                    <svg
                      className="h-5 w-5 text-black"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-3 mt-4">
              <p className="text-sm">{image && image.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
