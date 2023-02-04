import React, { useState } from 'react';
import { SearchPanel } from '@/modules/search-panel';
import { Place } from '@/modules/place';
import IconBottle from '@/images/bottle.svg';
import { PointListItem } from './components/';
import styles from './point-list.module.scss';

export const PointList = React.memo(() => {
  const checkbox = React.useRef<HTMLInputElement | null>(null);
  const [isViewDate, setIsViewDate] = useState<boolean>(false);
  const changeInput = React.useCallback(() => {
    setIsViewDate(Boolean(checkbox.current?.checked));
  }, [checkbox.current?.checked, setIsViewDate]);

  return (
        <div className={styles.container}>
            <SearchPanel />
            <div className={styles.checkbox}>
                <input id="check" type="checkbox" ref={checkbox} onChange={changeInput}/>
                <label htmlFor='check'>Дата раздачи тары </label>
                <IconBottle />
            </div>
            <Place/>
            <PointListItem  isViewDate={isViewDate}/>
        </div>
  );
});