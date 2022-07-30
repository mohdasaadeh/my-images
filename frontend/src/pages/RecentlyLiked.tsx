import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserCard from '../components/UserCard';
import LikedImageCardList from '../components/LikedImageCardList';

const RecentlyLiked: React.FC = () => {
  return (
    <>
      <Navbar />
      <section>
        <div className="container flex flex-col justify-start items-center lg:items-start px-6 py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <UserCard />
          <LikedImageCardList />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RecentlyLiked;
