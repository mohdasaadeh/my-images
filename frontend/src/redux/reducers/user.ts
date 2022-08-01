import { UserActionTypes } from '../action-types';
import { UserActions } from '../actions';
import { User } from '../types';

interface UserState {
  loading: boolean;
  data: User;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  data: {
    id: '',
    username: '',
    image: '',
  },
  error: null,
};

const userReducer = (
  state: UserState = initialState,
  action: UserActions,
): UserState => {
  switch (action.type) {
    case UserActionTypes.CHECK_USER:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case UserActionTypes.FETCH_USER:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case UserActionTypes.CREATE_USER:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case UserActionTypes.EDIT_USER:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case UserActionTypes.DELETE_USER:
      return { loading: false, data: initialState.data, error: null };
    case UserActionTypes.USER_LOADING:
      return {
        loading: true,
        data: state.data,
        error: null,
      };
    case UserActionTypes.USER_ERROR:
      return {
        loading: false,
        data: state.data,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
