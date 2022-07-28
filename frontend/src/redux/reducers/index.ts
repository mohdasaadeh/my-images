import { combineReducers } from 'redux';

import userReducer from './user';
import imageReducer from './image';

const reducers = combineReducers({
  user: userReducer,
  images: imageReducer,
});

export default reducers;
