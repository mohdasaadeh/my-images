import { ImageActionTypes } from '../action-types';
import { ImageActions } from '../actions';
import { Image } from '../types';

interface ImageState {
  loading: boolean;
  data: Image[];
  order: number[];
  error: string | null;
}

const initialState: ImageState = {
  loading: false,
  data: [],
  order: [],
  error: null,
};

const imageReducer = (
  state: ImageState = initialState,
  action: ImageActions,
): ImageState => {
  switch (action.type) {
    case ImageActionTypes.IMAGE_LOADING:
      return {
        loading: true,
        data: [...state.data],
        order: [...state.order],
        error: null,
      };
    case ImageActionTypes.FETCH_IMAGES_PAGINATED:
      const fetchPaginatedOrder = action.payload.map((item) => item.id);

      return {
        loading: false,
        data: [...state.data, ...action.payload],
        order: [...state.order, ...fetchPaginatedOrder],
        error: null,
      };

    case ImageActionTypes.DELETE_IMAGES_PAGINATED:
      return {
        loading: false,
        data: [],
        order: [],
        error: null,
      };
    case ImageActionTypes.CREATE_IMAGE:
      state.data.unshift(action.payload);
      state.order.unshift(action.payload.id);

      return {
        loading: false,
        data: state.data,
        order: state.order,
        error: null,
      };
    case ImageActionTypes.DELETE_IMAGE:
      const deleteId = action.payload.id;

      const deleteData = state.data.filter((item) => item.id !== deleteId);
      const deleteOrder = state.order.filter((item) => item !== deleteId);

      return {
        loading: false,
        data: deleteData,
        order: deleteOrder,
        error: null,
      };
    case ImageActionTypes.IMAGE_ERROR:
      return { loading: false, data: [], order: [], error: action.payload };
    default:
      return state;
  }
};

export default imageReducer;
