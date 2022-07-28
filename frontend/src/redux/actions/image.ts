import { ImageActionTypes } from '../action-types';
import { Image } from '../types';

export interface ImageLoadingAction {
  type: ImageActionTypes.IMAGE_LOADING;
}

export interface FetchImagesPaginatedAction {
  type: ImageActionTypes.FETCH_IMAGES_PAGINATED;
  payload: Image[];
}

export interface DeleteImagesPaginatedAction {
  type: ImageActionTypes.DELETE_IMAGES_PAGINATED;
}

export interface CreateImageAction {
  type: ImageActionTypes.CREATE_IMAGE;
  payload: Image;
}

export interface DeleteImageAction {
  type: ImageActionTypes.DELETE_IMAGE;
  payload: Image;
}

export interface ImageErrorAction {
  type: ImageActionTypes.IMAGE_ERROR;
  payload: string;
}

export type ImageActions =
  | ImageLoadingAction
  | FetchImagesPaginatedAction
  | DeleteImagesPaginatedAction
  | CreateImageAction
  | DeleteImageAction
  | ImageErrorAction;
