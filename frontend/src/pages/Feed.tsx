import React, { useState } from 'react';

import Footer from '../components/Footer';
import ImageCardList from '../components/ImageCardList';
import UserCard from '../components/UserCard';
import RecentlyLikedCard from '../components/RecentlyLikedCard';
import AddImage from '../modals/AddImage';
import DeleteImage from '../modals/DeleteImage';
import EditImage from '../modals/EditImage';

interface FeedProps {
  searchTerm: { value: string };
}

const Feed: React.FC<FeedProps> = ({ searchTerm }) => {
  const [isAddImageHidden, setIsAddImageHidden] = useState(true);
  const [isDeleteImageHidden, setIsDeleteImageHidden] = useState(true);
  const [isEditImageHidden, setIsEditImageHidden] = useState(true);
  const [image, setImage] = useState(null);

  return (
    <>
      <section>
        <div className="flex flex-col justify-between items-center lg:items-start px-6 mx-auto lg:flex-row">
          <UserCard setIsAddImageHidden={setIsAddImageHidden} />
          <ImageCardList
            setIsDeleteImageHidden={setIsDeleteImageHidden}
            setIsEditImageHidden={setIsEditImageHidden}
            setImage={setImage}
            searchTerm={searchTerm}
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
