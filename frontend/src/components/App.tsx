import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './styles/input.css';
import Signin from './Signin';
import Signup from './Signup';
import Navbar from './Navbar';
import Feed from './Feed';

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
