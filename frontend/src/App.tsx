import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './style.css';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/users/signin" element={<Signin />}></Route>
        <Route path="/users/signup" element={<Signup />}></Route>
        <Route path="/images" element={<Feed />}></Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
