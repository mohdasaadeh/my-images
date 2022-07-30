import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserCard from '../components/UserCard';
import LikedImageCardList from '../components/LikedImageCardList';
import AddImage from '../modals/AddImage';

const RecentlyLiked: React.FC = () => {
  const [isAddImageHidden, setIsAddImageHidden] = useState(true);
  const [isDeleteImageHidden, setIsDeleteImageHidden] = useState(true);
  const [imageId, setImageId] = useState(null);

  return (
    <>
      <Navbar />
      <section>
        <div className="container flex flex-col justify-start items-center lg:items-start px-6 py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <UserCard setIsAddImageHidden={setIsAddImageHidden} />
          <LikedImageCardList
            setIsDeleteImageHidden={setIsDeleteImageHidden}
            setImageId={setImageId}
          />
        </div>
      </section>
      <Footer />
      <AddImage isHidden={isAddImageHidden} setIsHidden={setIsAddImageHidden} />
    </>
  );
};

export default RecentlyLiked;
