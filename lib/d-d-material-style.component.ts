import {AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {DDDirective} from './d-d.directive';
import {DDService, IEvent} from './d-d.service';

@Component({
  selector: 'd-d-material-style',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./d-d.component.scss'],
  providers: [DDService],
})
export class DDMaterialStyleComponent implements OnInit, AfterViewInit {


  @Input()
  set config(config: {
    container: any,
    direction?: 'x' | 'y' | 'grid',
    matClick?: boolean,
    shadow?: boolean,
    collection?: any[],
    swipe?: string,
    autoWidth?: boolean,
    autoHeight?: boolean,
  }) {
    if (config) {
      this._container = config.container;
      this._direction = config.direction || null;
      this._materialStyle = config.matClick !== undefined ? config.matClick : true;
      this._shadow = config.shadow !== undefined ? config.shadow : false;
      this._customCollection = config.collection || null;
      this._swipe = config.swipe || null;
      this._parentWH.w = config.autoWidth;
      this._parentWH.h = config.autoHeight;
    }
  }
  @Input()
  set draggable(draggable: boolean) {
    this.is = draggable !== undefined ? draggable : true;
  }
  @Input()
  set laterInit(laterInit: boolean) {
    this._lInit = laterInit !== undefined ? laterInit : true;
    this._init();
  }
  @ContentChildren(DDDirective) collection: QueryList<DDDirective>;
  @Output() dChange: EventEmitter<IEvent> = new EventEmitter();
  @Output() dDrop: EventEmitter<IEvent> = new EventEmitter();

  private _customCollection: any[];
  private _container: any;
  private _direction: 'x' | 'y' | 'grid';
  private _materialStyle = true;
  private _shadow = false;
  private _swipe: string;
  private _lInit: boolean;
  private _parentWH: {w: boolean, h: boolean} = {w: false, h: false};

  constructor(private _dDService: DDService) { }

  ngOnInit(): void {
    this._dDService.drop.subscribe(event => this._sendEvent(event));
    this._dDService.change.subscribe(event => this._sendEvent(event));
  }

  private _sendEvent(event: IEvent) {
    switch (event.type) {
      case 'change':
        this.dChange.emit(event);
        break;
      case 'drop':
        this.dDrop.emit(event);
        break;
    }
  }

  ngAfterViewInit() {
    this._init();
  }

  private _init() {
    if (this.collection) {
      this._dDService.clearCollection();
      this.collection.forEach((el, index) => {
        el.container = el.container ? el.container : this._container;
        el.direction = el.direction ? el.direction : this._direction;
        el.materialStyle = el.materialStyle ? el.materialStyle : this._materialStyle;
        el.shadow = el.shadow ? el.shadow : this._shadow;
        el.customElem = el.customElem ? el.customElem : (this._customCollection ? (this._customCollection[index] || null) : null);
        el.swipeElem = this._swipe;
        el.dDservice = this._dDService;
        el.parentWH = this._parentWH;
        el.laterInit = this._lInit;
      });
    }
  }

  set is(is: boolean) {
    if (this.collection) {
      this.collection.forEach(el => el.draggable = is);
    }
  }

}
