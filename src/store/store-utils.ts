import { TData } from '@/store/types';

export const mapPlace = (data: TData[]): string[] => {
  return data.reduce((acc: string[], { place }) => {
    if (!acc.includes(place)) {
      acc.push(place);
    }
    return acc;
  }, []).concat(['Все']);
};