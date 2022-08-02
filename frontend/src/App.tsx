import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './style.css';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import RecentlyLiked from './pages/RecentlyLiked';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState({ value: '' });

  return (
    <React.Fragment>
      <Routes>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <>
                <Navbar setSearchTerm={setSearchTerm} />
                <Feed searchTerm={searchTerm} />
              </>
            }
          ></Route>
          <Route
            path="/recently-liked"
            element={
              <>
                <Navbar setSearchTerm={setSearchTerm} />
                <RecentlyLiked />
              </>
            }
          ></Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
