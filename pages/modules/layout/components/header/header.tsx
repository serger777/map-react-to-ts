import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './header.module.scss';


export const Header = () => {
  return <header>
        <div className={styles.container}>
            <div className={classNames(styles.header, styles.mobile)}>
                <div className={styles.logo}>
                    <a className={styles.img} href="/">
                        <Image
                            priority
                            src='/images/logo-mobile.png'
                            height={80}
                            width={80}
                            alt="Артезианский источник"
                        />
                    </a>
                    <a className={styles.linkText} href="/">Артезианский источник</a>
                </div>
                <div className={styles.burger}>
                    <a className={classNames(styles.iconMenu, classNames.jsMenu)}></a>
                </div>
            </div>
            <div className={classNames(styles.header, styles.desktop)}>
                <div className={styles.logo}>
                    <a className={styles.link} href="/">
                        <Image
                            priority
                            src='/images/logo.png'
                            height={120}
                            width={120}
                            alt="Артезианский источник"
                        />
                    </a>
                </div>
                <div className={styles.menu}>
                    <a href="" className={styles.link} >карта киосков</a>
                    <a href="" className={styles.link} >новости</a>
                    <a href="" className={styles.link} >контакты</a>
                    <a href="" className={styles.link} >отзывы</a>
                </div>
                <div className={styles.phone}>
                    <p>Санкт-Петербург</p>
                    <a className={styles.icon} href="tel:88005114314"><span>8&nbsp;800&nbsp;511 43&nbsp;14</span></a>
                </div>
            </div>
        </div>
    </header>;
};