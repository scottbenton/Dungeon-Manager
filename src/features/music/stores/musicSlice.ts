import { StoreState } from '@/stores/StoreState';
import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import { subscribeToMusicItems } from '../api/subscribeToMusicItems';
import { BaseMusicItem } from '../types/BaseMusicItem';
import { MusicSource } from '../types/MusicSource';
import { PlaybackStatus } from '../types/PlaybackStatus';
import { SpotifyMusicDocument } from '../types/SpotifyMusicDocument';
import { YoutubeMusicDocument } from '../types/YoutubeMusicDocument';
import { MusicState } from './MusicState';

const initialState: MusicState = {
  musicItems: {
    spotify: {},
    youtube: {},
  },
  tags: {},
  isLoading: true,
  playbackState: {
    status: PlaybackStatus.NotSelected,
  },
};

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    updateLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setMusicItems(
      state: MusicState,
      action: PayloadAction<{
        items: { [id: string]: SpotifyMusicDocument | YoutubeMusicDocument };
        source: MusicSource;
      }>
    ) {
      const { items, source } = action.payload;

      state.isLoading = false;
      state.error = undefined;

      state.musicItems[source] = action.payload.items as any;

      Object.values(items).forEach((item: BaseMusicItem) => {
        item.tags.forEach((tag) => {
          state.tags[tag] = tag;
        });
      });
    },
    addOrUpdateMusicItem(
      state,
      action: PayloadAction<{
        id: string;
        doc: SpotifyMusicDocument | YoutubeMusicDocument;
      }>
    ) {
      const { id, doc } = action.payload;

      state.musicItems[doc.source][id] = {
        ...state.musicItems[doc.source][id],
        ...doc,
      };

      action.payload.doc.tags.forEach((tag) => {
        state.tags[tag] = tag;
      });
    },
    deleteMusicItem(
      state,
      action: PayloadAction<{ id: string; source: MusicSource }>
    ) {
      const { source, id } = action.payload;
      delete state.musicItems[source][id];
    },
    updateMusicItemImage(
      state,
      action: PayloadAction<{
        id: string;
        item: SpotifyMusicDocument | YoutubeMusicDocument;
        url: string;
      }>
    ) {
      const { id, item, url } = action.payload;
      state.musicItems[item.source][id].imageUrl = url;
    },
    updateError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
    startPlayback(
      state,
      action: PayloadAction<{ id: string; source: MusicSource }>
    ) {
      const { source, id } = action.payload;

      const item = state.musicItems[source][id];
      if (item) {
        state.playbackState.item = item;
        state.playbackState.status = PlaybackStatus.Ready;
      } else {
        state.playbackState.item = undefined;
        state.playbackState.status = PlaybackStatus.NotSelected;
        state.error = `Could not find ${source} item with id ${id}.`;
      }
    },
    updatePlaybackStatus(state, action: PayloadAction<PlaybackStatus>) {
      const status = action.payload;
      state.playbackState.status = status;
    },
  },
});

export const {
  updateLoading,
  setMusicItems,
  addOrUpdateMusicItem,
  deleteMusicItem,
  updateMusicItemImage,
  updateError,
  startPlayback,
  updatePlaybackStatus,
} = musicSlice.actions;

export const createMusicListener: ThunkAction<
  () => void,
  StoreState,
  undefined,
  AnyAction
> = (dispatch, getState) => {
  const uid = getState().auth.user?.id || '';

  const unsubscribeSpotify = subscribeToMusicItems({
    uid,
    source: MusicSource.Spotify,
    getState,
    setMusicItems: (docs: { [id: string]: SpotifyMusicDocument }) => {
      dispatch(setMusicItems({ items: docs, source: MusicSource.Spotify }));
    },
    updateMusicItem: (id: string, doc: SpotifyMusicDocument) => {
      dispatch(addOrUpdateMusicItem({ id, doc }));
    },
    deleteMusicItem: (id: string) => {
      dispatch(deleteMusicItem({ id, source: MusicSource.Spotify }));
    },
    loadImage: (id: string, doc: SpotifyMusicDocument) => {
      console.debug(id);
    },
  });

  const unsubscribeYoutube = subscribeToMusicItems({
    uid,
    source: MusicSource.Youtube,
    getState,
    setMusicItems: (docs: { [id: string]: YoutubeMusicDocument }) => {
      dispatch(setMusicItems({ items: docs, source: MusicSource.Youtube }));
    },
    updateMusicItem: (id: string, doc: YoutubeMusicDocument) => {
      dispatch(addOrUpdateMusicItem({ id, doc }));
    },
    deleteMusicItem: (id: string) => {
      dispatch(deleteMusicItem({ id, source: MusicSource.Youtube }));
    },
    loadImage: (id: string, doc: YoutubeMusicDocument) => {
      console.debug(id);
    },
  });

  return () => {
    unsubscribeSpotify();
    unsubscribeYoutube();
  };
};
