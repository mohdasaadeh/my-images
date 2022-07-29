import { LikedImageActionTypes } from '../action-types';
import { Image } from '../types';

export interface LikedImageLoadingAction {
  type: LikedImageActionTypes.LIKED_IMAGE_LOADING;
}

export interface FetchLikedImagesPaginatedAction {
  type: LikedImageActionTypes.FETCH_LIKED_IMAGES_PAGINATED;
  payload: Image[];
}

export interface DeleteLikedImagesPaginatedAction {
  type: LikedImageActionTypes.DELETE_LIKED_IMAGES_PAGINATED;
}

export interface CreateLikedImageAction {
  type: LikedImageActionTypes.CREATE_LIKED_IMAGE;
  payload: Image;
}

export interface DeleteLikedImageAction {
  type: LikedImageActionTypes.DELETE_LIKED_IMAGE;
  payload: Image;
}

export interface LikedImageErrorAction {
  type: LikedImageActionTypes.LIKED_IMAGE_ERROR;
  payload: string;
}

export type LikedImageActions =
  | LikedImageLoadingAction
  | FetchLikedImagesPaginatedAction
  | DeleteLikedImagesPaginatedAction
  | CreateLikedImageAction
  | DeleteLikedImageAction
  | LikedImageErrorAction;
