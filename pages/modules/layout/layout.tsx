import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import Header from './components/header';
import styles from './layout.module.scss';

interface ILayout {
  params: {
    title: string;
  };
  children: ReactNode
}
export const Layout: FunctionComponent<ILayout> = ({ params, children } ) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
    
  return (!isSSR && <>
      <head>
          <meta charSet="UTF-8"/>
          <title>Артезианский источник {params.title}</title>
          <meta property="og:title" content="Артезианский источник" key="title" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="Киоски с артезианской водой" />
          <meta name="keywords" content="артезианская вода, киоски, родниковая вода, ключ здоровья" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/stylesheet.css" />
          <link rel="shortcut icon" href="" />
      </head >
      <body>
      <Header />
      <main className={styles.main}>
          {children}
      </main>
      </body>
    </>);
};