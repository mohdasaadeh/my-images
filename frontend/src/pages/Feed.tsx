import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageCardList from '../components/ImageCardList';
import UserCard from '../components/UserCard';
import RecentlyLikedCard from '../components/RecentlyLikedCard';
import AddImage from '../modals/AddImage';
import DeleteImage from '../modals/DeleteImage';
import EditImage from '../modals/EditImage';

const Feed: React.FC = () => {
  const [isAddImageHidden, setIsAddImageHidden] = useState(true);
  const [isDeleteImageHidden, setIsDeleteImageHidden] = useState(true);
  const [isEditImageHidden, setIsEditImageHidden] = useState(true);
  const [image, setImage] = useState(null);

  return (
    <>
      <Navbar />
      <section>
        <div className="container flex flex-col justify-between items-center lg:items-start px-6 py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <UserCard setIsAddImageHidden={setIsAddImageHidden} />
          <ImageCardList
            setIsDeleteImageHidden={setIsDeleteImageHidden}
            setIsEditImageHidden={setIsEditImageHidden}
            setImage={setImage}
          />
          <RecentlyLikedCard />
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

export default Feed;
