import React, { useState } from 'react';

import Footer from '../components/Footer';
import LikedImageCardList from '../components/LikedImageCardList';
import DeleteImage from '../modals/DeleteImage';
import EditImage from '../modals/EditImage';

const RecentlyLiked: React.FC = () => {
  const [isDeleteImageHidden, setIsDeleteImageHidden] = useState(true);
  const [isEditImageHidden, setIsEditImageHidden] = useState(true);
  const [image, setImage] = useState(null);

  return (
    <>
      <section>
        <div className="flex flex-col justify-between items-center lg:items-center px-6 mx-auto">
          <LikedImageCardList
            setIsDeleteImageHidden={setIsDeleteImageHidden}
            setIsEditImageHidden={setIsEditImageHidden}
            setImage={setImage}
          />
        </div>
      </section>
      <Footer />
      {image && (
        <>
          {' '}
          <DeleteImage
            isHidden={isDeleteImageHidden}
            setIsHidden={setIsDeleteImageHidden}
            image={image}
          />
          <EditImage
            isHidden={isEditImageHidden}
            setIsHidden={setIsEditImageHidden}
            image={image}
          />{' '}
        </>
      )}
    </>
  );
};

export default RecentlyLiked;
