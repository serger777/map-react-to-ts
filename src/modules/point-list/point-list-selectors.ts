import { createSelector } from '@reduxjs/toolkit';
import { getFilterData, getSearchPoint, TData } from '@/store';

export const getFilterPoint = createSelector(
  getFilterData,
  getSearchPoint,
  (
    data: TData[],
    searchPoint: string,
  ) => data.filter(item => item.name.toLowerCase().indexOf(searchPoint.toLowerCase()) > -1),
);