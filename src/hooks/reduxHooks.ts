import { AppDispatch } from '@/stores/store';
import { StoreState } from '@/stores/StoreState';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useReduxDispatch: () => AppDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<StoreState> = useSelector;
