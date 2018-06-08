import { Subject } from 'rxjs/Subject';
export interface IPoint {
    x: number;
    y: number;
}
export interface IElem {
    point: IPoint;
    active: boolean;
    el: any;
    customEl?: any;
}
export interface IEvent {
    type: 'change' | 'drop';
    point: IPoint;
    elem: IElem | any;
    collection: IElem[] | any;
}
export interface IGrid {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}
export declare class DDService {
    private _collection;
    shadow: any;
    grid: IGrid;
    change: Subject<IEvent>;
    drop: Subject<IEvent>;
    constructor();
    add(el: IElem): void;
    sorting(): void;
    active: IPoint;
    readonly collection: IElem[];
    readonly customCollection: any[];
    getCoords(elem: any): {
        top: number;
        left: number;
    };
}
