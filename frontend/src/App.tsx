import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './style.css';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import RecentlyLiked from './pages/RecentlyLiked';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Feed />}></Route>
        <Route path="/recently-liked" element={<RecentlyLiked />}></Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
