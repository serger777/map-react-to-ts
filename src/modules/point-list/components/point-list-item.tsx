import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedId, setSelectedId } from '@/store';
import IconBottle from '@/images/bottle.svg';
import { selectedPointsAction } from '@/modules/map';
import { getFilterPoint } from '../point-list-selectors';
import styles from './point-list-item.module.scss';

type TPointListItem = {
  isViewDate: boolean;
};
export const PointListItem = React.memo<TPointListItem>(({ isViewDate }) => {
  const dispatch = useDispatch();
  const filterPoints  = useSelector(getFilterPoint);
  const selectedId  = useSelector(getSelectedId);
  const setId = React.useCallback((id: string) => {
    dispatch(setSelectedId(id));
    dispatch(selectedPointsAction(id));
  }, [selectedPointsAction]);

  return <div className={styles.list}>
            {filterPoints.map((item) => {
              const { name, day, id, time } = item;
              const isSelected = selectedId === id;
              return <div className={styles.item} key={name}>
                    <div onClick={() => setId(id)}
                      className={ isSelected ? styles.selected : ''}>
                       {name}
                    </div>
                { (Boolean(day) && isViewDate) &&  <div className={styles.time}>
                    <IconBottle />
                    <span >
                      {day}
                    </span>
                    <span>
                      {time}
                    </span>
                </div>}
              </div>;
            })}
    </div>;
});