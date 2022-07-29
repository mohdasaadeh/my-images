import { combineReducers } from 'redux';

import userReducer from './user';
import imageReducer from './image';
import likedImageReducer from './likedImage';

const reducers = combineReducers({
  user: userReducer,
  images: imageReducer,
  likedImages: likedImageReducer,
});

export default reducers;
