import { Action, ThunkAction } from '@reduxjs/toolkit';
import { store } from './store';

export type TData = {
  id: string;
  place: string;
  day?: string;
  name: string;
  time: string;
  points: number[];
};

export type TCollectionMap = {
  type: string;
  place: string;
  id: number;
  geometry: {
    coordinates: number[];
    type: string;
  };
  properties: { hintContent: any; };
}[] ;

export type TMapState = {
  data: TData[],
  status: string,
  bound: number,
  center: number[],
  currentId: string,
  place: string[],
  currentPlace: string,
  point: string,
  selectedId?: string,
  isOpenSidebar: boolean,
};

export type AppDispatch = typeof store.dispatch;
export type TRootState = {
  dataMap: TMapState,
};
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
TRootState,
unknown,
Action<string>
>;
