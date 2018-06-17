import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {

  collect = [
    { id: 1, style: 'v1', data: 'I\'m not aquamarine'},
    { id: 2, style: 'v2', data: 'I\'m not cyan'},
    { id: 3, style: 'v3', data: 'I\'m not palegreen'},
    { id: 4, style: 'v1', data: 'I\'m not aquamarine'},
    { id: 5, style: 'v2', data: 'I\'m not cyan'},
    { id: 6, style: 'v3', data: 'I\'m not palegreen'},
    { id: 7, style: 'v1', data: 'I\'m not aquamarine'},
    { id: 8, style: 'v2', data: 'I\'m not cyan'},
    { id: 9, style: 'v3', data: 'I\'m not palegreen'},
    { id: 10, style: 'v1', data: 'I\'m not aquamarine'},
    { id: 11, style: 'v2', data: 'I\'m not cyan'},
    { id: 12, style: 'v3', data: 'I\'m not palegreen'},
    { id: 13, style: 'v1', data: 'I\'m not aquamarine'},
    { id: 14, style: 'v2', data: 'I\'m not cyan'},
    { id: 15, style: 'v3', data: 'I\'m not palegreen'},
    { id: 16, style: 'v1', data: 'I\'m not aquamarine'},
    { id: 17, style: 'v2', data: 'I\'m not cyan'},
    { id: 18, style: 'v3', data: 'I\'m not palegreen'},
  ];

  classSwipe: string = '.swipe';
  freeBoxConfig: any = {matClick: true, shadow: null, swipe:  null};
  sorted: any = [];
  laterInit = false;
  draggable = true;
  private _element: any;

  constructor() { }

  ngOnInit(): void {
    this._sorted = this.collect;
  }

  get miniCollect(): any {
    return this.collect.filter(el => el.id < 4);
  }

  set _sorted(map: any) {
    this.sorted = map.map(el => el.id);
  }

  get element(): string {
    return this._element ? JSON.stringify(this._element) : '';
  }

  onChange(event) {
    this._sorted = event.collection;
  }

  miniDrop(event) {
    this._element = event.elem;
  }

  onDrop(event) {
    this._element = event.elem;
    this._sorted = event.collection;
  }

}
