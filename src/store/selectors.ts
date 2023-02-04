import { TData, TRootState } from './types';
import { createSelector } from '@reduxjs/toolkit';

export const getDataMap = (state: TRootState): TData[] => state.dataMap.data;

export const getCurrentId = (state: TRootState): string => state.dataMap.currentId;

export const getStatusMap = (state: TRootState): string => {
  return state.dataMap.status;
};

export const getSearchPoint = (state: TRootState): string => state.dataMap.point;

export const getSelectedId = (state: TRootState): string | undefined => state.dataMap.selectedId;

export const getCurrentPoint = createSelector(
  getDataMap,
  getSelectedId,
  (
    dataMap: TData[],
    id: string | undefined,
  ): TData | undefined => dataMap?.find(item => item.id == id),
);

export const getMapPlace = (state: TRootState): string[] => state.dataMap.place;

export const getCurrentPlace = (state: TRootState): string => state.dataMap.currentPlace;

export const getFilterData = createSelector(
  getDataMap,
  getCurrentPlace,
  (
    data: TData[],
    currentPlace: string,
  ): TData[] =>  data.filter(item => !currentPlace || item.place === currentPlace),
);

export const getIsOpenSidebar = (state: TRootState): boolean => state.dataMap.isOpenSidebar;