import { combineReducers } from 'redux';

import userReducer from './user';

const reducers = combineReducers({
  user: userReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
