declare namespace ymaps {
  export function ready(): Promise;

  class Promise {
    // eslint-disable-next-line @typescript-eslint/ban-types
    then(onFulfilled?: Function, onRejected?: Function, onProgress?: Function, ctx?: any): Promise;
  }

  export class Map {
    objects: any;

    constructor(element: string | any, state: MapState, { suppressMapOpenBlock: any });
    behaviors: any;
  }

  export class MapState {
    center: number[];

    controls: string[];

    zoom: number;

    innerText: string;

    ObjectManager: any;
  }
}