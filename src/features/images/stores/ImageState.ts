import { ImageItemObject } from '../types/ImageItemObject';

export interface ImageState {
  images: ImageItemObject;
  currentSelectedImageId?: string;
  imageOrderArray?: string[];
  isLoading: boolean;
  error?: string;
}
