import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageCardList from '../components/ImageCardList';
import UserCard from '../components/UserCard';
import RecentlyLikedCard from '../components/RecentlyLikedCard';

const Feed: React.FC = () => {
  return (
    <>
      <Navbar />
      <section>
        <div className="container flex flex-col justify-between items-center lg:items-start px-6 py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <UserCard />
          <ImageCardList />
          <RecentlyLikedCard />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Feed;
