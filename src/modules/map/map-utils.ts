import { TData } from '@/store';

export const pointHover = (data: TData[], id: string) => {
  data.forEach(item => {
    if (item.id === id) {
      window.myCollection.objects.setObjectOptions(id, {
        iconImageHref: '/images/placeholder.svg',
      });
    } else {
      window.myCollection.objects.setObjectOptions(
        item.id,
        {
          iconImageHref: '/images/placeholder-hover.svg',
        },
      );
    }
  });
};

/**
 * Load yamaps to ap
 * @param url
 * @constructor
 */
export function LoadScript(url: string) {
  const scriptsStatuses = {} as any;
  return new Promise((resolve, reject) => {

    if (scriptsStatuses[url]) {
      switch (scriptsStatuses[url].status) {
        case 'loading':
          // @ts-ignore
          scriptsStatuses[url].needResolving.push(resolve.bind(this));
          return;
        case 'complete':
          // @ts-ignore
          resolve(this);
          return;
      }
    }
    scriptsStatuses[url] = {
      status: 'loading',
      needResolving: [],
    };

    let isReady = false;
    const t = document.getElementsByTagName('script')[0];
    const s = document.createElement('script');

    s.type = 'text/javascript';
    s.src = url;
    s.async = true;
    // @ts-ignore
    s.onload = s.onreadystatechange = function () {
      // @ts-ignore
      if (!isReady && (!this.readyState || this.readyState === 'complete')) {
        isReady = true;
        // скрипт был загружен, сработал эвент, метим скрипт как complete и резолвим все промисы, которые попали в needResolving из-за статуса loading
        scriptsStatuses[url].status = 'complete';
        scriptsStatuses[url].needResolving.forEach((resolveBinded: () => any) => resolveBinded());
        resolve(this);
      }
    };
    s.onerror = s.onabort = reject;
    t.parentNode?.insertBefore(s, t);
  });
}

/**
 * Added points to ya map
 * @param data
 * @param map
 */
const pointsAdd = (data: TData[], map: any) => {
  const { ymaps } = window;
  window.myCollection = new ymaps.ObjectManager({
    clusterize: true,
    clusterHasBalloon: false,
    clusterGridSize: 5,
    geoObjectOpenBalloonOnClick: true,
  });

  window.myCollection.clusters.options.set({
    clusterIcons: [
      {
        href: '/images/oval.svg',
        size: [40, 40],
        offset: [-20, -20],
      },
    ],
  });
  window.myCollection.objects.options.set({
    hasBalloon: true,
    hasHint: true,
    iconLayout: 'default#image',
    iconImageHref: '/images/placeholder-hover.svg',
    iconImageSize: [40, 40],
    iconImageOffset: [-20, -20],
  });

  const objMap = data.map((item: TData, index: number) => {
    return {
      type: 'Feature',
      place: item.place,
      id: index,
      geometry: {
        coordinates: [
          item.points[1],
          item.points[0],
        ],
        type: 'Point',
      },
      properties: {
        hintContent: item.name,
      },
    };
  });
  window.myCollection.add(objMap);
  map.geoObjects.add(window.myCollection);
  map.setBounds(
    window.myCollection.getBounds(),
    {
      checkZoomRange: true, preciseZoom: true, zoomMargin: [10],
    },
  );
  window.myCollection.objects.events.add('click', (e: any) => {
    const objId = e.get('objectId');
    pointHover(data, objId);
  });
};

/**
 * Initial map to first render
 * @param data
 */
export const initMap = (data: TData[]) =>  {
  const { ymaps } = window;
  const mapContainer = document.querySelector('#map') as any;
  mapContainer.innerText = '';
  // @ts-ignore
  const zoomControl = new ymaps.control.ZoomControl({
    options: {
      size: 'small',
      position: {
        top: 20,
        right: 20,
      },
    },
  });
    // @ts-ignore
  window.myMap = new ymaps.Map(mapContainer, {
    center: [60.048048, 30.386486],
    controls: [zoomControl],
    zoom: 11,
    // zoomMargin: 100,

  }, {
    suppressMapOpenBlock: true,
  });
  window.myMap.behaviors.disable('scrollZoom');
  pointsAdd(data, window.myMap);
};

export const setMapBounds = () => {

  let zoomMargin: number[] | number = [0, 0, 0, 350];
  if (window.matchMedia('screen and (max-width:768px)')) {
    zoomMargin = 10;
  }
  // @ts-ignore
  window.myMap.setBounds(
    // @ts-ignore
    window.myCollection.getBounds(),
    {
      checkZoomRange: true, preciseZoom: true, zoomMargin: zoomMargin,
    },
  );
};

export const filterYaMap = (place: string) => {
  //@ts-ignore
  window.myCollection.setFilter(shopObject => {
    if (place === '') {
      return shopObject.type === 'Feature';
    } else {
      return shopObject.place === place;
    }
  });
  setMapBounds();
};

export const checkCurrentPoint = (data: TData[], points: number[], id: string) => {
  window.myMap.setCenter([points[1], points[0]], 15, {
    duration: 300,
  });
  pointHover(data, id);
};