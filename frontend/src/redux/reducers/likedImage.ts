import { LikedImageActionTypes } from '../action-types';
import { LikedImageActions } from '../actions';
import { Image } from '../types';

interface LikedImageState {
  loading: boolean;
  data: Image[];
  order: number[];
  error: string | null;
}

const initialState: LikedImageState = {
  loading: false,
  data: [],
  order: [],
  error: null,
};

const likedImageReducer = (
  state: LikedImageState = initialState,
  action: LikedImageActions,
): LikedImageState => {
  switch (action.type) {
    case LikedImageActionTypes.LIKED_IMAGE_LOADING:
      return {
        loading: true,
        data: [...state.data],
        order: [...state.order],
        error: null,
      };
    case LikedImageActionTypes.FETCH_LIKED_IMAGES_PAGINATED:
      const fetchPaginatedOrder = action.payload.map((item) => item.id);

      return {
        loading: false,
        data: [...state.data, ...action.payload],
        order: [...state.order, ...fetchPaginatedOrder],
        error: null,
      };

    case LikedImageActionTypes.DELETE_LIKED_IMAGES_PAGINATED:
      return {
        loading: false,
        data: [],
        order: [],
        error: null,
      };
    case LikedImageActionTypes.CREATE_LIKED_IMAGE:
      state.data.push(action.payload);
      state.order.push(action.payload.id);

      return {
        loading: false,
        data: state.data,
        order: state.order,
        error: null,
      };
    case LikedImageActionTypes.DELETE_LIKED_IMAGE:
      const deleteId = action.payload.id;

      const deleteData = state.data.filter((item) => item.id !== deleteId);
      const deleteOrder = state.order.filter((item) => item !== deleteId);

      return {
        loading: false,
        data: deleteData,
        order: deleteOrder,
        error: null,
      };
    case LikedImageActionTypes.LIKED_IMAGE_ERROR:
      return { loading: false, data: [], order: [], error: action.payload };
    default:
      return state;
  }
};

export default likedImageReducer;
