import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { getCurrentPoint, getDataMap, TRootState } from '@/store';
import { checkCurrentPoint } from './map-utils';


export const selectedPointsAction = (id: string) => (
  dispatch: Dispatch<AnyAction>,
  getState: () => TRootState,
): void => {
  const state = getState();
  const data = getDataMap(state);
  const currentPoint = getCurrentPoint(state);
  if (!currentPoint) {
    return;
  }
  checkCurrentPoint(data, currentPoint.points, id);
};