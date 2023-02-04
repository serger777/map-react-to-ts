import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, loadMap, getStatusMap, getDataMap, setIsOpenSidebar, setSelectedId } from '@/store';
import { selectedPointsAction } from './map-actions';
import { LoadScript, initMap } from './map-utils';
import { MAP_URL } from './map-constants';
import styles from './map.module.scss';

export const Map = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(getDataMap);
  const status = useSelector(getStatusMap);

  useEffect(() => {
    // @ts-ignore
    dispatch(loadMap());
  }, []);

  useEffect(() => {
    if (status === 'ready') {
      LoadScript(MAP_URL).then(() => {
        const { ymaps } = window;
        ymaps.ready().then(() => {
          console.log('map init');
          initMap(data);
          window.myCollection?.objects.events.add('click', (e: any) => {
            const objId = e.get('objectId');
            dispatch(setSelectedId(objId));
            dispatch(selectedPointsAction(objId));
            dispatch(setIsOpenSidebar(true));
          });
        });
      });
    }
  }, [status, data]);

  return <div id='map' className={styles.map}>
            <span className="loader">Загружаем карту</span>
        </div>;
};