import jsonMap from './map.json';

export const fetchMap = () => {
  return new Promise<any[]>((resolve) =>
    setTimeout(() => resolve(jsonMap), 500),
  );
};