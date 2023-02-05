import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPlace, getMapPlace, setCurrentPlace } from '@/store';
import { filterYaMap } from '@/modules/map/';
import styles from './place.module.scss';


export const Place = React.memo(() => {
  const dispatch = useDispatch();
  const place = useSelector(getMapPlace);
  const currentPlace = useSelector(getCurrentPlace);
  const setPlace = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentPlace(e.target.value));
    filterYaMap(e.target.value);
  }, [dispatch, setCurrentPlace]);

  return <div className={styles.list}>
        { place.map((item, idx) => (
            <div className={styles.item} >
                <input onChange={setPlace} type="radio" id={item} name='place' value={item}/>
                <label  className={currentPlace == item ? styles.active : '' }  htmlFor={item}>
                    {item === '' ? 'Все' : item}
                </label>
            </div>
        ))}
    </div>;
});