import { UserActionTypes } from '../action-types';
import { UserActions } from '../actions';

interface UserState {
  loading: boolean;
  data: {
    id: string | number | null;
  };
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  data: {
    id: null,
  },
  error: null,
};

const userReducer = (
  state: UserState = initialState,
  action: UserActions,
): UserState => {
  switch (action.type) {
    case UserActionTypes.CHECK_USER:
      return { loading: false, data: { id: action.payload.id }, error: null };
    case UserActionTypes.FETCH_USER:
      return { loading: false, data: { id: action.payload.id }, error: null };
    case UserActionTypes.CREATE_USER:
      return { loading: false, data: { id: action.payload.id }, error: null };
    case UserActionTypes.DELETE_USER:
      return { loading: false, data: { id: null }, error: null };
    case UserActionTypes.USER_ERROR:
      return { loading: false, data: { id: null }, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
