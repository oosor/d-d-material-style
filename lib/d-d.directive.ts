import {
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef, EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import {DDService, IElem, IEvent, IPoint} from './d-d.service';
import {DDComponent} from './d-d.component';

interface ILimits {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

@Directive({
  selector: '[ddMatStyle]',
})
export class DDDirective implements AfterViewInit {

  private static COMP = 'D-D-MATERIAL-STYLE';

  @Input()
  set draggable(draggable: boolean) {
    this._is = draggable !== undefined ? draggable : true;
  }
  @Input()
  set laterInit(laterInit: boolean) {
    this.lInit = laterInit !== undefined ? laterInit : true;
    this.isLaterInit(true);
  }
  @Input()
  set config(config: {
    container: any,
    direction?: 'x' | 'y' | 'grid',
    matClick?: boolean,
    shadow?: boolean,
    elem?: any,
    swipe?: string,
    autoWidth?: boolean,
    autoHeight?: boolean,
  }) {
    if (config) {
      this.container = config.container;
      this.direction = config.direction || null;
      this.materialStyle = config.matClick !== undefined ? config.matClick : true;
      this.shadow = config.shadow !== undefined ? config.shadow : false;
      this.customElem = config.elem || null;
      this.swipeElem = config.swipe || null;
      this.parentWH.w = config.autoWidth;
      this.parentWH.h = config.autoHeight;
    }
  }
  @Output() dChange: EventEmitter<IEvent> = new EventEmitter();
  @Output() dDrop: EventEmitter<IEvent> = new EventEmitter();

  private _limits: ILimits;
  private _innerBox: ILimits;
  private _parent: any;
  private _point: IPoint;
  private _shift: IPoint;
  private _collect: IElem[];
  private _elem: any;
  private _margin: IPoint = {x: 0, y: 0};
  private _padding: IPoint = {x: 0, y: 0};
  private _is = true;
  container: any;
  customElem: any;
  is = false;
  direction: 'x' | 'y' | 'grid';
  materialStyle = true;
  shadow = false;
  swipeElement: any;
  withContainer: boolean;
  lInit = true;
  parentWH: {w: boolean, h: boolean} = {w: false, h: false};

  constructor(private _elementRef: ElementRef,
              private _render: Renderer2,
              private _resolver: ComponentFactoryResolver,
              private _vcr: ViewContainerRef,
              private _dDService: DDService) { }


  ngAfterViewInit(): void {
    this.isLaterInit(false);
  }

  isLaterInit(isLast: boolean) {
    if (this.lInit) {
      if (this._elem) {
        this._render.removeClass(this._elem, 'clear');
      }
      const component = this._render.parentNode(this._elementRef.nativeElement);
      this.withContainer = DDDirective.COMP.indexOf(component.nodeName) !== -1;
      this.init(component, isLast);
      this._setLimits(isLast);
    }
  }

  init(component: any, isLast: boolean) {
    this._parent = this.withContainer ? this._render.parentNode(component) : component;

    this._setPadding();
    this._setMargin(true);
    this.point(this._dDService.getCoords(this._elementRef.nativeElement), isLast);

    setTimeout(() => {

      const factory = this._resolver.resolveComponentFactory(DDComponent);
      const componentRef: ComponentRef<DDComponent> = this._vcr.createComponent(factory);
      this._elem = componentRef.location.nativeElement;

      this._setMargin(false);
      if (!this.direction || this.direction !== 'x' && this.direction !== 'grid' ) {
        this._render.setStyle(this._elem, 'width', this._elementRef.nativeElement.offsetWidth + 'px');
        this._render.setStyle(this._elem, 'height', this._elementRef.nativeElement.offsetHeight + 'px');
      }

      this._render.appendChild(this._elem, this._elementRef.nativeElement);
      this._render.setStyle(this._elem, 'top', this._point.y + 'px');
      this._render.setStyle(this._elem, 'left', this._point.x + 'px');
      this._dDService.add(this._getIEl());
    });
    this._collect = this._dDService.collection;
  }

  set dDservice(service: DDService) {
    this._dDService = service;
  }

  set swipeElem(swipe: string) {
    if (swipe) {
      setTimeout(() => {
        this.swipeElement = this._elementRef.nativeElement.querySelector(swipe) || null;
      });
    }
  }

  @HostListener('dragstart') onDragStart() { return false; }
  @HostListener('mousedown', ['$event']) onMouseDown(event) {

    if (this.lInit && this._is) {

      if (this.swipeElement) {
        const limitSwipeCoords = this._dDService.getCoords(this.swipeElement);
        const limitSwipe: ILimits = {
          top: limitSwipeCoords.top,
          right: limitSwipeCoords.left + this.swipeElement.offsetWidth,
          bottom: limitSwipeCoords.top + this.swipeElement.offsetHeight,
          left: limitSwipeCoords.left,
        };
        if (event.pageY >= limitSwipe.top && event.pageY <= limitSwipe.bottom && event.pageX >= limitSwipe.left && event.pageX <= limitSwipe.right) {
          this.is = true;
        }
      } else {
        this.is = true;
      }

      const coords = this._dDService.getCoords(this._elem);
      this._shift = {x: event.pageX - coords.left, y: event.pageY - coords.top};

      this.matClick(event);

      if (this.is) {
        const zIndex = this._elem.style.zIndex || 1;
        this._render.addClass(this._elem, 'd-d-move');
        this._render.setStyle(this._elem, 'zIndex', 9999);

        this._dDService.active = this._point;
        this._collect = this._dDService.collection;

        this._addShadow();

        this.coordinate = event;

        document.onmousemove = (e) => {
          this.coordinate = e;
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
          this.is = false;
          this._removeShadow();
          this._drop();
          this._render.removeClass(this._elem, 'd-d-move');
          this._render.setStyle(this._elem, 'zIndex', zIndex);
        };
      }
    }
  }

  private _setPadding() {
    this._padding.y = +window.getComputedStyle(this._parent, null).getPropertyValue('padding-top').replace(/\D+/g, '');
    this._padding.x = +window.getComputedStyle(this._parent, null).getPropertyValue('padding-left').replace(/\D+/g, '');
  }

  private _setMargin(is: boolean) {
    if (is) {
      this._margin.y = +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-top').replace(/\D+/g, '')
        + +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-bottom').replace(/\D+/g, '');
      this._margin.x = +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-left').replace(/\D+/g, '')
        + +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-right').replace(/\D+/g, '');
    } else {
      this._render.setStyle(this._elementRef.nativeElement, 'marginTop', '0');
      this._render.setStyle(this._elementRef.nativeElement, 'marginRight', '0');
      this._render.setStyle(this._elementRef.nativeElement, 'marginBottom', '0');
      this._render.setStyle(this._elementRef.nativeElement, 'marginLeft', '0');
    }
  }

  private _setLimits(is: boolean) {
    if (this.container) {
      const containerCoords = this._dDService.getCoords(this.container);
      this._limits = {
        top: containerCoords.top,
        right: this.container.offsetWidth + containerCoords.left - this._elementRef.nativeElement.offsetWidth,
        bottom: this.container.offsetHeight + containerCoords.top - this._elementRef.nativeElement.offsetHeight,
        left: containerCoords.left,
      };
      this._innerBox = {
        top: containerCoords.top,
        right: this.container.offsetWidth + containerCoords.left,
        bottom: this.container.offsetHeight + containerCoords.top,
        left: containerCoords.left,
      };
      if (this.parentWH.w && is) {
        this._render.setStyle(this.container, 'width', this.container.offsetWidth + 'px');
      }
      if (this.parentWH.h && is) {
        this._render.setStyle(this.container, 'height', this.container.offsetHeight + 'px');
      }
    }
  }

  set coordinate(e) {
    const shift: IPoint = Object.assign({}, this._shift);
    const tmpPoint: IPoint = {x: e.pageX, y: e.pageY};
    if (this._limits && e.pageX - this._shift.x >= this._limits.right) {
      tmpPoint.x = this._limits.right;
      this._shift.x = e.pageX - this._limits.right;
      shift.x = 0;
    } else if (this._limits && e.pageX - this._shift.x <= this._limits.left) {
      tmpPoint.x = this._limits.left;
      this._shift.x = e.pageX - this._limits.left;
      shift.x = 0;
    }
    if (this._limits && e.pageY - this._shift.y >= this._limits.bottom) {
      tmpPoint.y = this._limits.bottom;
      this._shift.y = e.pageY - this._limits.bottom;
      shift.y = 0;
    } else if (this._limits && e.pageY - this._shift.y  <= this._limits.top) {
      tmpPoint.y = this._limits.top;
      this._shift.y = e.pageY - this._limits.top;
      shift.y = 0;
    }

    const parentCoords = this._dDService.getCoords(this._parent);
    const point: IPoint = {
      x: tmpPoint.x - shift.x - parentCoords.left,
      y: tmpPoint.y - shift.y - parentCoords.top
    };

    this._render.setStyle(this._elem, 'left', point.x + 'px');
    this._render.setStyle(this._elem, 'top', point.y + 'px');
    if (this.direction) {
      this.swipe(point);
    } else {
      this._point = point;
      this._emit('change');
    }
  }

  private _addShadow() {
    if (this.shadow) {
      this._dDService.shadow = this._render.createElement('div');
      const width = this._elem.offsetWidth;
      const height = this._elem.offsetHeight;
      this._render.setStyle(this._dDService.shadow, 'width', width - 10 + 'px');
      this._render.setStyle(this._dDService.shadow, 'height', height - 10 + 'px');
      this._updateShadow();
      this._render.addClass(this._dDService.shadow, 'd-d-shadow');

      this._render.insertBefore(this.withContainer ? this._render.parentNode(this._elem) : this._parent, this._dDService.shadow, this._elem);
    }
  }

  private _removeShadow() {
    if (this.shadow) {
      this._render.removeChild(this.withContainer ? this._render.parentNode(this._elem) : this._parent, this._dDService.shadow);
    }
  }

  swipe(point: IPoint) {
    const height = this._elem.offsetHeight + this._margin.y;
    const width = this._elem.offsetWidth + this._margin.x;
    let ySet = Math.floor((point.y - this._padding.y + (height / 2)) / height) * height + this._padding.y;
    let xSet = Math.floor((point.x - this._padding.x + (width / 2)) / width) * width + this._padding.x;
    if (ySet > this._dDService.grid.maxY) {
      ySet = this._dDService.grid.maxY;
    } else if (ySet < this._dDService.grid.minY) {
      ySet = this._dDService.grid.minY;
    }
    if (xSet > this._dDService.grid.maxX) {
      xSet = this._dDService.grid.maxX;
    } else if (xSet < this._dDService.grid.minX) {
      xSet = this._dDService.grid.minX;
    }
    const invertH = point.y < this._point.y ? 1 : -1;
    const invertW = point.x < this._point.x ? 1 : -1;

    if (this._point.y !== ySet || this._point.x !== xSet) {
      this._collect.forEach(el => {
        if (this._point.y !== ySet && this.direction === 'grid') {
          if ((this._point.y - (0.5 * height - 1)) < el.point.y && (this._point.y + (0.5 * height - 1)) > el.point.y && ((invertH > 0 && el.point.x < this._point.x) || (invertH < 0 && el.point.x > this._point.x))) {
            this._setElements(el, {width: invertH * width});
          } else if ((ySet + (0.5 * height - 1)) < el.point.y && (this._point.y - (0.5 * height - 1)) > el.point.y) {
            if (invertH > 0 && (this._dDService.grid.maxX - (0.5 * width - 1)) < el.point.x && (this._dDService.grid.maxX + (0.5 * width - 1)) > el.point.x) {
              this._setElements(el, {width: invertH * (el.point.x - this._dDService.grid.minX)});
              this._setElements(el, {height: invertH * height});
            } else if (invertH < 0 && (this._dDService.grid.minX - (0.5 * width - 1)) < el.point.x && (this._dDService.grid.minX + (0.5 * width - 1)) > el.point.x) {
              this._setElements(el, {width: invertH * (el.point.x - this._dDService.grid.maxX)});
              this._setElements(el, {height: invertH * height});
            } else {
              this._setElements(el, {width: invertH * width});
            }
          } else if ((ySet - (0.5 * height - 1)) < el.point.y && (ySet + (0.5 * height - 1)) > el.point.y && ((invertH > 0 && el.point.x > (xSet - (0.5 * width - 1))) || ((invertH < 0 && el.point.x < (xSet + (0.5 * width - 1)))))) {
            if (invertH > 0 && (this._dDService.grid.maxX - (0.5 * width - 1)) < el.point.x && (this._dDService.grid.maxX + (0.5 * width - 1)) > el.point.x) {
              this._setElements(el, {width: invertH * (this._dDService.grid.minX - el.point.x)});
              this._setElements(el, {height: invertH * height});
            } else if (invertH < 0 && (this._dDService.grid.minX - (0.5 * width - 1)) < el.point.x && (this._dDService.grid.minX + (0.5 * width - 1)) > el.point.x) {
              this._setElements(el, {width: invertH * (el.point.x - this._dDService.grid.maxX)});
              this._setElements(el, {height: invertH * height});
            } else {
              this._setElements(el, {width: invertH * width});
            }
          }
        } else if (this._point.x !== xSet && (this.direction === 'grid' || this.direction === 'x')) {
          if ((this._point.y - (0.5 * height - 1)) < el.point.y && (this._point.y + (0.5 * height - 1)) > el.point.y) {
            if (((this._point.x - invertW * width) - (0.5 * width - 1)) < el.point.x && ((this._point.x - invertW * width) + (0.5 * width - 1)) > el.point.x) {
              this._setElements(el, {width: invertW * width});
            }
          }
        } else if (this._point.y !== ySet && this.direction === 'y') {
          if ((this._point.x - (0.5 * width - 1)) < el.point.x && (this._point.x + (0.5 * width - 1)) > el.point.x) {
            if (((this._point.y - invertH * height) - (0.5 * height - 1)) < el.point.y && ((this._point.y - invertH * height) + (0.5 * height - 1)) > el.point.y) {
              this._setElements(el, {height: invertH * height});
            }
          }
        }
      });
      this._point.y = ySet;
      this._point.x = xSet;
      this._emit('change');
      if (this.shadow) {
        this._updateShadow();
      }
    }
  }

  private _setElements(el: IElem, point: any) {
    point.height ? el.point.y += point.height : el.point.x += point.width;
    this._render.setStyle(el.el, point.height ? 'top' : 'left', (point.height ? el.point.y : el.point.x) + 'px');
  }

  private _updateShadow() {
    this._render.setStyle(this._dDService.shadow, 'opacity', 0);
    setTimeout(() => {
      this._render.setStyle(this._dDService.shadow, 'top', this._point.y + 5 + 'px');
      this._render.setStyle(this._dDService.shadow, 'left', this._point.x + 5 + 'px');
      this._render.setStyle(this._dDService.shadow, 'opacity', 1);
    }, 200);
  }

  private _drop() {
    this._emit('drop');
    if (this.direction && this.direction === 'grid') {
      if (this._collect.length > 1) {
        if (this._collect[this._collect.length - 1].active) {
          if (this._collect[this._collect.length - 2].point.x + this._elem.offsetWidth > this._dDService.grid.maxX) {
            this._point.x = this._dDService.grid.minX;
          } else {
            this._point.x = this._collect[this._collect.length - 2].point.x + this._elem.offsetWidth + this._margin.x;
            this._point.y = this._collect[this._collect.length - 2].point.y;
          }
        }
      }
    }
    this._render.setStyle(this._elem, 'top', this._point.y + 'px');
    this._render.setStyle(this._elem, 'left', this._point.x + 'px');
  }

  private _clearStyleEnd() {
    this._render.addClass(this._elem, 'clear');
  }

  private _getIEl(): IElem {
    return {
      point: this._point,
      active: false,
      el: this._elem,
      customEl: this.customElem || null,
    };
  }

  private point(coordinate: any, isMargin?: boolean) {
    const parentCoords = this._dDService.getCoords(this._parent);
    this._point = {x: Math.round(coordinate.left - parentCoords.left - (isMargin ? 0 : this._margin.x)), y: Math.round(coordinate.top - parentCoords.top - (isMargin ? 0 : this._margin.y))};
  }

  private _emit(type: 'change' | 'drop') {
    this._dDService.sorting();
    const event: IEvent = {
      type: type,
      point: this._point,
      elem: this.customElem || this._elem,
      collection: this.customElem ? this._dDService.customCollection : this._collect,
    };
    switch (type) {
      case 'change':
        this.dChange.emit(event);
        this._dDService.change.next(event);
        break;
      case 'drop':
        this.dDrop.emit(event);
        this._dDService.drop.next(event);
        break;
    }
  }

  matClick(event) {
    if (this.materialStyle) {
      let el = this._elem,
        shift: IPoint = this._shift;
      if (this.is && this.swipeElement) {
        el = this.swipeElement;
        const coords = this._dDService.getCoords(this.swipeElement);
        shift = {x: event.pageX - coords.left, y: event.pageY - coords.top};
      }

      if (el.className.indexOf('btn-disabled') !== -1) {
        return;
      }

      const dia = Math.min(el.offsetHeight, el.offsetWidth, 100),
        ripple = this._render.createElement('div');

      this._render.addClass(ripple, 'ripple');
      this._render.appendChild(el, ripple);

      const rippleWave = this._render.createElement('div');
      this._render.addClass(rippleWave, 'rippleWave');
      this._render.setStyle(rippleWave, 'width', dia + 'px');
      this._render.setStyle(rippleWave, 'height', dia + 'px');
      this._render.setStyle(rippleWave, 'left', (shift.x - (dia / 2)) + 'px');
      this._render.setStyle(rippleWave, 'top', (shift.y - (dia / 2)) + 'px');

      ripple.appendChild(rippleWave);
      rippleWave.addEventListener('animationend', () => this._render.removeChild(el, ripple));
    }
  }

}
