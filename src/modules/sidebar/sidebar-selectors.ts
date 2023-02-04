import { createSelector } from '@reduxjs/toolkit';
import { getCurrentPoint } from '../../store';
import { TData } from '@/store';

export const getCurrentUrlMap = createSelector(
  getCurrentPoint,
  (
    currentPoin: TData | undefined,
  ): string => `https://yandex.ru/maps/?whatshere[point]=${currentPoin?.points[1]},${currentPoin?.points[0]}&whatshere[zoom]=17`,
);