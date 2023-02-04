import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchPoint, getSearchPoint } from '@/store';
import styles from './search-panel.module.scss';

export const  SearchPanel = React.memo(() => {
  const dispatch = useDispatch();
  const point = useSelector(getSearchPoint);

  const changeInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchPoint(e.target.value));
  }, [setSearchPoint]);

  return <div className={styles.header}>
            <input
                onChange={changeInput}
                className={styles.search}
                type="text"
                placeholder={'найти по адресу'}
                value={point}
            />
        </div>;
});

