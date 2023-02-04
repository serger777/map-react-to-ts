import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPoint, getIsOpenSidebar, setIsOpenSidebar } from '@/store';
import CancelIcon  from '@/images/cancel.svg';
import { BallonTime } from './components';
import { getCurrentUrlMap } from './sidebar-selectors';
import styles from './sidebar.module.scss';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const currentPoint = useSelector(getCurrentPoint);
  const currentUrlMap = useSelector(getCurrentUrlMap);
  const isOpenSidebar = useSelector(getIsOpenSidebar);

  const closeSidebar = () => {
    dispatch(setIsOpenSidebar(false));
  };

  if (!isOpenSidebar) {
    return null;
  }

  return (
        <div className={styles.balloon}>
            <button onClick={closeSidebar} className={styles.close}>
               <CancelIcon />
            </button>
            <h4>{currentPoint?.name}</h4>
            <div className={styles.image}>
                <img src="/images/art_house.png" alt=""/>
            </div>
            <p className={styles.infoTop}>Автоматы для розлива работают 24 часа</p>
            <BallonTime/>
            <div className={styles.balloonInfo}>
                <p> Раздача один раз в месяц для каждого киоска </p>
                <p>Для удобства наших покупателей мы будем раздавать 6 литровые бутылки абсолютно бесплатно,
                    при условии покупки воды.</p>
            </div>
            <a target={'_blank'} href={currentUrlMap} rel="noreferrer">Открыть в Яндекс картах</a>
        </div>
  );
};