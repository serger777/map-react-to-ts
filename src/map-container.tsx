import React from 'react';
import { Map } from '@/modules/map';
import { PointList } from '@/modules/point-list';
import { Sidebar } from '@/modules/sidebar';
import './style.scss';

export const MapContainer  = (): JSX.Element => {
  // TODO доделать типизацию
  return <>
    <PointList />
    <Sidebar />
    <Map />
  </>;
};