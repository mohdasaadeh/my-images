import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useTypedSelector, useAppDispatch } from '../hooks';
import { LikedImageActionTypes } from '../redux';

const RecentlyLikedCard: React.FC = () => {
  const dispatch = useAppDispatch();

  const likedImages = useTypedSelector(({ likedImages }) => {
    return likedImages.data;
  });
  const user = useTypedSelector(({ user }) => user.data);

  useEffect(() => {
    const canceller = new AbortController();

    dispatch({
      type: LikedImageActionTypes.DELETE_LIKED_IMAGES_PAGINATED,
    });

    if (user.id && user.id !== 'out') {
      axios
        .get('/api/images/recently-liked', {
          signal: canceller.signal,
        })
        .then((res) => {
          dispatch({
            type: LikedImageActionTypes.FETCH_LIKED_IMAGES_PAGINATED,
            payload: res.data.items,
          });
        })
        .catch(() => {});
    }

    return () => canceller.abort();
  }, [user]);

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
    <div className="flex flex-col justify-between w-72">
      <div className="w-full">
        <div className="bg-primary mt-5 flex flex-col items-center justify-center p-4 rounded-2xl">
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
