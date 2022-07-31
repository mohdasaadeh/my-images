import React, { useState } from 'react';

import Footer from '../components/Footer';
import UserCard from '../components/UserCard';
import LikedImageCardList from '../components/LikedImageCardList';
import AddImage from '../modals/AddImage';
import DeleteImage from '../modals/DeleteImage';
import EditImage from '../modals/EditImage';

const RecentlyLiked: React.FC = () => {
  const [isAddImageHidden, setIsAddImageHidden] = useState(true);
  const [isDeleteImageHidden, setIsDeleteImageHidden] = useState(true);
  const [isEditImageHidden, setIsEditImageHidden] = useState(true);
  const [image, setImage] = useState(null);

  return (
    <>
      <section>
        <div className="container flex flex-col justify-start items-center lg:items-start px-6 py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <UserCard setIsAddImageHidden={setIsAddImageHidden} />
          <LikedImageCardList
            setIsDeleteImageHidden={setIsDeleteImageHidden}
            setIsEditImageHidden={setIsEditImageHidden}
            setImage={setImage}
          />
        </div>
      </section>
      <Footer />
      <AddImage isHidden={isAddImageHidden} setIsHidden={setIsAddImageHidden} />
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
