import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

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

@Injectable()
export class DDService {

  private _collection: IElem[] = [];
  shadow: any;
  grid: IGrid = {minX: 9999, maxX: -9999, minY: 9999, maxY: -9999};
  change: Subject<IEvent> = new Subject();
  drop: Subject<IEvent> = new Subject();

  constructor() { }

  add(el: IElem) {
    this._collection.push(el);
    this._collection.forEach(_el => {
      this.grid.minX = this.grid.minX > _el.point.x ? _el.point.x : this.grid.minX;
      this.grid.maxX = this.grid.maxX < _el.point.x ? _el.point.x : this.grid.maxX;
      this.grid.minY = this.grid.minY > _el.point.y ? _el.point.y : this.grid.minY;
      this.grid.maxY = this.grid.maxY < _el.point.y ? _el.point.y : this.grid.maxY;
    });
  }

  sorting() {
    this._collection.sort((a, b) => {
      if (a.point.x < b.point.x)
        if (a.point.y > b.point.y)
          return -1;
        else return 1;
      if (a.point.y < b.point.y)
        if (a.point.y < b.point.y)
          return 1;
        else return -1;
      else return -1;
    }).reverse();
  }

  set active(point: IPoint) {
    this._collection.forEach(el => el.active = el.point.x === point.x && el.point.y === point.y);
  }

  get collection(): IElem[] {
    return this._collection;
  }

  clearCollection(): void {
    this._collection = [];
  }

  get customCollection(): any[] {
    return this._collection.map(el => el.customEl);
  }

  getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
      top: Math.round(box.top + pageYOffset),
      left: Math.round(box.left + pageXOffset),
    };
  }
}
