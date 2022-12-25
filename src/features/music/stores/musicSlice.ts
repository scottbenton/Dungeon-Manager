import { StoreState } from '@/stores/StoreState';
import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import { getSpotifyItemDetails } from '../api/getSpotifyItemDetails';
import { subscribeToMusicItems } from '../api/subscribeToMusicItems';
import { BaseMusicItem } from '../types/BaseMusicItem';
import { MusicSource } from '../types/MusicSource';
import { PlaybackStatus } from '../types/PlaybackStatus';
import { SpotifyMusicDocument } from '../types/SpotifyMusicDocument';
import { YoutubeMusicDocument } from '../types/YoutubeMusicDocument';
import { MusicState } from './MusicState';

function updateLocalRefreshToken(refreshToken?: string) {
  if (refreshToken) {
    localStorage.setItem('spotify.refresh_token', refreshToken);
  } else {
    localStorage.removeItem('spotify.refresh_token');
  }
}
function getLocalRefreshToken() {
  return localStorage.getItem('spotify.refresh_token');
}

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
  spotifyAuth: {
    isLoading: false,
    refreshToken: getLocalRefreshToken() || undefined,
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
    updateMusicItemLabelAndImage(
      state,
      action: PayloadAction<{
        id: string;
        item: SpotifyMusicDocument;
        label: string;
        url: string;
      }>
    ) {
      const { id, item, url, label } = action.payload;
      state.musicItems[item.source][id].imageUrl = url;
      state.musicItems[item.source][id].label = label;
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
    addSpotifyTokens(
      state,
      action: PayloadAction<{ refreshToken: string; accessToken: string }>
    ) {
      const { refreshToken, accessToken } = action.payload;
      updateLocalRefreshToken(refreshToken);

      state.spotifyAuth = {
        isLoading: false,
        refreshToken,
        accessToken,
      };
    },
    clearSpotifyTokens(state) {
      updateLocalRefreshToken(undefined);
      state.spotifyAuth.accessToken = undefined;
      state.spotifyAuth.refreshToken = undefined;
      state.spotifyAuth.isLoading = false;
    },
    updateSpotifyAccessToken(state, action: PayloadAction<string | undefined>) {
      const accessToken = action.payload;
      state.spotifyAuth.isLoading = !!accessToken;
      state.spotifyAuth.accessToken = accessToken;
    },
    updateSpotifyError(state, action: PayloadAction<string | undefined>) {
      state.spotifyAuth.errorMessage = action.payload;
    },
    updateSpotifyLoading(state, action: PayloadAction<boolean>) {
      state.spotifyAuth.isLoading = action.payload;
    },
  },
});

export const {
  updateLoading,
  setMusicItems,
  addOrUpdateMusicItem,
  deleteMusicItem,
  updateMusicItemLabelAndImage,
  updateError,
  startPlayback,
  updatePlaybackStatus,
  addSpotifyTokens,
  clearSpotifyTokens,
  updateSpotifyAccessToken,
  updateSpotifyError,
  updateSpotifyLoading,
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
      getSpotifyItemDetails(doc)
        .then(({ url, label }) => {
          dispatch(
            updateMusicItemLabelAndImage({
              id,
              item: doc,
              label,
              url,
            })
          );
        })
        .catch((error) => {
          if (error.message) {
            dispatch(updateError(error.message));
          } else {
            dispatch(updateError('Error fetching spotify item details'));
          }
        });
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
  });

  return () => {
    unsubscribeSpotify();
    unsubscribeYoutube();
  };
};
