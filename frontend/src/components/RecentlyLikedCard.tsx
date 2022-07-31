import React from 'react';
import { Link } from 'react-router-dom';

import { useTypedSelector } from '../hooks';
import { useFetchLikedImagesPaginated } from '../hooks';
import { Image } from '../redux';

const RecentlyLikedCard: React.FC = () => {
  const likedImages = useTypedSelector(({ likedImages }) => {
    return likedImages.order
      .sort((a, b) => b - a)
      .map((likeDate) => {
        return likedImages.data.find(
          (likedImage) => likedImage.likes.currentUserLikeDate === likeDate,
        );
      });
  }) as Image[];

  useFetchLikedImagesPaginated<HTMLDivElement>();

  const renderCardLikedImages = () => {
    if (!likedImages || !likedImages.length)
      return (
        <div className="flex mt-2 items-center justify-between bg-white rounded-xl">
          <p className="text-sm">You liked no image yet</p>
        </div>
      );

    return likedImages.slice(0, 5).map((likedImage) => {
      return (
        <div
          key={likedImage && likedImage.id}
          className="flex mt-2 items-center justify-between bg-white rounded-xl"
        >
          <img src={likedImage && likedImage.url} className="w-8 mr-2" />
          <p className="text-sm">You liked this image</p>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col justify-between">
      <div style={{ width: '17rem' }}>
        <div className="bg-primary mt-10 flex flex-col items-center justify-center p-4 rounded-2xl">
          <div className="mx-auto rounded-full py-2 w-50">
            <h1>Recent Activities</h1>
          </div>
          <div className="flex flex-col mt-2 items-center justify-between bg-white p-6 rounded-xl">
            {renderCardLikedImages()}
          </div>
          <div className="w-full mt-8">
            <Link to="/recently-liked">
              <button
                className="bg-secondary py-2 px-4 hover:bg-primary text-primary hover:text-secondary
                   w-full rounded-lg shadow-lg transition duration-700 ease-in-out"
              >
                View More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyLikedCard;
