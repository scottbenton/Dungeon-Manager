import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import { StoreState } from '@/stores/StoreState';
import { onSnapshot, Unsubscribe } from 'firebase/firestore';
import { ImageItemObject } from '../types/ImageItemObject';
import { ImageItem } from '../types/ImageItem';
import { ImageState } from './ImageState';
import { imageSetListener } from '../api/imageSetListener';
import { getImageItemCollectionRef } from '../api/references';
import { ImageDocument } from '../types/ImageDocument';
import { getImageUrl } from '../api/getImageUrl';
import { imageItemListener } from '../api/imageItemListener';

const initialState: ImageState = {
  images: {},
  isLoading: true,
};

export const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    updateLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setImages(state, action: PayloadAction<ImageItemObject>) {
      state.images = action.payload;
      state.isLoading = false;
    },
    addOrUpdateImage(
      state,
      action: PayloadAction<{ id: string; item: ImageItem }>
    ) {
      state.images[action.payload.id] = {
        ...state.images[action.payload.id],
        ...action.payload.item,
      };
    },
    deleteImage(state, action: PayloadAction<{ id: string }>) {
      delete state.images[action.payload.id];
    },

    updateImageUrl(state, action: PayloadAction<{ id: string; url: string }>) {
      state.images[action.payload.id].url = action.payload.url;
    },

    updateError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },

    updateSetInformation(
      state,
      action: PayloadAction<{
        selectedImageId?: string;
        imageOrderArray?: string[];
      }>
    ) {
      state.currentSelectedImageId = action.payload.selectedImageId;
      state.imageOrderArray = action.payload.imageOrderArray;
    },
  },
});

const convertImageDocumentToImageItem = (
  id: string,
  imageDoc: ImageDocument,
  url?: string
): ImageItem => {
  const item: ImageItem = {
    id: id,
    label: imageDoc.displayName,
    filename: imageDoc.filename,
  };

  if (url) {
    item.url = url;
  }

  return item;
};

export const {
  updateLoading,
  setImages,
  addOrUpdateImage,
  deleteImage,
  updateImageUrl,
  updateError,
  updateSetInformation,
} = imageSlice.actions;

export const createImageListener: ThunkAction<
  () => void,
  StoreState,
  undefined,
  AnyAction
> = (dispatch, getState) => {
  const uid = getState().auth.user?.id || '';
  const imageSetUnsubscribe = imageSetListener(
    uid,
    (data) => {
      dispatch(
        updateSetInformation({
          selectedImageId: data?.currentSelectedItem,
          imageOrderArray: data?.itemIds,
        })
      );
    },
    (error) => {
      dispatch(updateError(error.message));
    }
  );

  const loadImage = (id: string, filename: string) => {
    getImageUrl(uid, filename)
      .then((url) => {
        dispatch(updateImageUrl({ id, url }));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const imageItemUnsubscribe = onSnapshot(
    getImageItemCollectionRef(uid),
    (snapshot) => {
      if (Object.keys(getState().images.images).length === 0) {
        // We have nothing in the store - set all at once
        const images: ImageItemObject = {};

        snapshot.docs.forEach((imageDoc) => {
          images[imageDoc.id] = convertImageDocumentToImageItem(
            imageDoc.id,
            imageDoc.data()
          );
          loadImage(imageDoc.id, imageDoc.data().filename);
        });

        dispatch(setImages(images));
      } else {
        snapshot.docChanges().forEach((change) => {
          switch (change.type) {
            case 'added':
            case 'modified':
              dispatch(
                addOrUpdateImage({
                  id: change.doc.id,
                  item: convertImageDocumentToImageItem(
                    change.doc.id,
                    change.doc.data()
                  ),
                })
              );
              if (!getState().images.images[change.doc.id].url) {
                loadImage(change.doc.id, change.doc.data().filename);
              }
              break;
            case 'removed':
              dispatch(deleteImage({ id: change.doc.id }));
              break;
            default:
              break;
          }
        });
      }
    }
  );

  return () => {
    imageSetUnsubscribe();
    imageItemUnsubscribe();
  };
};

export const createImageViewerListenerThunk = (uid: string) => {
  const thunk: ThunkAction<() => void, StoreState, undefined, AnyAction> = (
    dispatch,
    getState
  ) => {
    let itemUnsubscribe: Unsubscribe;

    const loadImage = (id: string, filename: string) => {
      getImageUrl(uid, filename)
        .then((url) => {
          dispatch(updateImageUrl({ id, url }));
        })
        .catch((e) => {
          console.error(e);
        });
    };

    const imageSetUnsubscribe = imageSetListener(
      uid,
      (data) => {
        if (itemUnsubscribe) {
          itemUnsubscribe();
        }
        const selectedImageId = data?.currentSelectedItem;
        dispatch(
          updateSetInformation({
            selectedImageId: selectedImageId,
            imageOrderArray: data?.itemIds,
          })
        );
        if (selectedImageId) {
          imageItemListener(
            uid,
            selectedImageId,
            (item) => {
              if (item) {
                dispatch(
                  addOrUpdateImage({
                    id: selectedImageId,
                    item: convertImageDocumentToImageItem(
                      selectedImageId,
                      item
                    ),
                  })
                );
                if (!getState().images.images[selectedImageId].url) {
                  loadImage(selectedImageId, item.filename);
                }
              }
            },
            (error) => {
              dispatch(updateError(error));
            }
          );
        }
      },
      (error) => {
        dispatch(updateError(error.message));
      }
    );

    return () => {
      imageSetUnsubscribe();
      if (itemUnsubscribe) {
        itemUnsubscribe();
      }
    };
  };
  return thunk;
};
