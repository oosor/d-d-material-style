"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var d_d_service_1 = require("./d-d.service");
var d_d_component_1 = require("./d-d.component");
var DDDirective = /** @class */ (function () {
    function DDDirective(_elementRef, _render, _resolver, _vcr, _dDService) {
        this._elementRef = _elementRef;
        this._render = _render;
        this._resolver = _resolver;
        this._vcr = _vcr;
        this._dDService = _dDService;
        this.dChange = new core_1.EventEmitter();
        this.dDrop = new core_1.EventEmitter();
        this._margin = { x: 0, y: 0 };
        this._padding = { x: 0, y: 0 };
        this.is = false;
        this.materialStyle = true;
        this.shadow = false;
    }
    DDDirective_1 = DDDirective;
    Object.defineProperty(DDDirective.prototype, "config", {
        set: function (config) {
            var _this = this;
            if (config) {
                this.direction = config.direction || null;
                this.materialStyle = config.matClick !== undefined ? config.matClick : true;
                this.shadow = config.shadow !== undefined ? config.shadow : false;
                this.customElem = config.elem || null;
                this.swipeElement = config.swipe || null;
                if (this.swipeElement) {
                    setTimeout(function () { return _this.swipeElement = _this._elementRef.nativeElement.querySelector(_this.swipeElement) || null; });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    DDDirective.prototype.ngAfterViewInit = function () {
        var component = this._render.parentNode(this._elementRef.nativeElement);
        this.withContainer = DDDirective_1.COMP.indexOf(component.nodeName) !== -1;
        this.init(component);
        this._setLimits();
    };
    DDDirective.prototype.init = function (component) {
        var _this = this;
        this._parent = this.withContainer ? this._render.parentNode(component) : component;
        this._setPadding();
        this._setMargin(true);
        this.point = this._dDService.getCoords(this._elementRef.nativeElement);
        setTimeout(function () {
            var factory = _this._resolver.resolveComponentFactory(d_d_component_1.DDComponent);
            var componentRef = _this._vcr.createComponent(factory);
            _this._elem = componentRef.location.nativeElement;
            _this._setMargin(false);
            if (!_this.direction || _this.direction !== 'x' && _this.direction !== 'grid') {
                _this._render.setStyle(_this._elem, 'width', _this._elementRef.nativeElement.offsetWidth + 'px');
                _this._render.setStyle(_this._elem, 'height', _this._elementRef.nativeElement.offsetHeight + 'px');
            }
            _this._render.appendChild(_this._elem, _this._elementRef.nativeElement);
            _this._render.setStyle(_this._elem, 'top', _this._point.y + 'px');
            _this._render.setStyle(_this._elem, 'left', _this._point.x + 'px');
            _this._dDService.add(_this._getIEl());
        });
        this._collect = this._dDService.collection;
    };
    Object.defineProperty(DDDirective.prototype, "dDservice", {
        set: function (service) {
            this._dDService = service;
        },
        enumerable: true,
        configurable: true
    });
    DDDirective.prototype.onDragStart = function () { return false; };
    DDDirective.prototype.onMouseDown = function (event) {
        var _this = this;
        if (this.swipeElement) {
            var limitSwipeCoords = this._dDService.getCoords(this.swipeElement);
            var limitSwipe = {
                top: limitSwipeCoords.top,
                right: limitSwipeCoords.left + this.swipeElement.offsetWidth,
                bottom: limitSwipeCoords.top + this.swipeElement.offsetHeight,
                left: limitSwipeCoords.left,
            };
            if (event.pageY >= limitSwipe.top && event.pageY <= limitSwipe.bottom && event.pageX >= limitSwipe.left && event.pageX <= limitSwipe.right) {
                this.is = true;
            }
        }
        else
            this.is = true;
        var coords = this._dDService.getCoords(this._elem);
        this._shift = { x: event.pageX - coords.left, y: event.pageY - coords.top };
        this.matClick(event);
        if (this.is) {
            var zIndex_1 = this._elem.style.zIndex || 1;
            this._render.addClass(this._elem, 'd-d-move');
            this._render.setStyle(this._elem, 'zIndex', 9999);
            this._dDService.active = this._point;
            this._collect = this._dDService.collection;
            this._addShadow();
            this.coordinate = event;
            document.onmousemove = function (e) {
                _this.coordinate = e;
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
                _this.is = false;
                _this._removeShadow();
                _this._drop();
                _this._render.removeClass(_this._elem, 'd-d-move');
                _this._render.setStyle(_this._elem, 'zIndex', zIndex_1);
            };
        }
    };
    DDDirective.prototype._setPadding = function () {
        this._padding.y = +window.getComputedStyle(this._parent, null).getPropertyValue('padding-top').replace(/\D+/g, "");
        this._padding.x = +window.getComputedStyle(this._parent, null).getPropertyValue('padding-left').replace(/\D+/g, "");
    };
    DDDirective.prototype._setMargin = function (is) {
        if (is) {
            this._margin.y = +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-top').replace(/\D+/g, "")
                + +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-bottom').replace(/\D+/g, "");
            this._margin.x = +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-left').replace(/\D+/g, "")
                + +window.getComputedStyle(this._elementRef.nativeElement, null).getPropertyValue('margin-right').replace(/\D+/g, "");
        }
        else {
            this._render.setStyle(this._elementRef.nativeElement, 'marginTop', '0');
            this._render.setStyle(this._elementRef.nativeElement, 'marginRight', '0');
            this._render.setStyle(this._elementRef.nativeElement, 'marginBottom', '0');
            this._render.setStyle(this._elementRef.nativeElement, 'marginLeft', '0');
        }
    };
    DDDirective.prototype._setLimits = function () {
        if (this.container) {
            var containerCoords = this._dDService.getCoords(this.container);
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
        }
    };
    Object.defineProperty(DDDirective.prototype, "coordinate", {
        set: function (e) {
            var shift = Object.assign({}, this._shift);
            var tmpPoint = { x: e.pageX, y: e.pageY };
            if (this._limits && e.pageX - this._shift.x >= this._limits.right) {
                tmpPoint.x = this._limits.right;
                this._shift.x = e.pageX - this._limits.right;
                shift.x = 0;
            }
            else if (this._limits && e.pageX - this._shift.x <= this._limits.left) {
                tmpPoint.x = this._limits.left;
                this._shift.x = e.pageX - this._limits.left;
                shift.x = 0;
            }
            if (this._limits && e.pageY - this._shift.y >= this._limits.bottom) {
                tmpPoint.y = this._limits.bottom;
                this._shift.y = e.pageY - this._limits.bottom;
                shift.y = 0;
            }
            else if (this._limits && e.pageY - this._shift.y <= this._limits.top) {
                tmpPoint.y = this._limits.top;
                this._shift.y = e.pageY - this._limits.top;
                shift.y = 0;
            }
            var parentCoords = this._dDService.getCoords(this._parent);
            var point = {
                x: tmpPoint.x - shift.x - parentCoords.left,
                y: tmpPoint.y - shift.y - parentCoords.top
            };
            this._render.setStyle(this._elem, 'left', point.x + 'px');
            this._render.setStyle(this._elem, 'top', point.y + 'px');
            if (this.direction)
                this.swipe(point);
            else {
                this._point = point;
                this._emit('change');
            }
        },
        enumerable: true,
        configurable: true
    });
    DDDirective.prototype._addShadow = function () {
        if (this.shadow) {
            this._dDService.shadow = this._render.createElement('div');
            var width = this._elem.offsetWidth;
            var height = this._elem.offsetHeight;
            this._render.setStyle(this._dDService.shadow, 'width', width - 10 + 'px');
            this._render.setStyle(this._dDService.shadow, 'height', height - 10 + 'px');
            this._updateShadow();
            this._render.addClass(this._dDService.shadow, 'd-d-shadow');
            this._render.insertBefore(this.withContainer ? this._render.parentNode(this._elem) : this._parent, this._dDService.shadow, this._elem);
        }
    };
    DDDirective.prototype._removeShadow = function () {
        if (this.shadow)
            this._render.removeChild(this.withContainer ? this._render.parentNode(this._elem) : this._parent, this._dDService.shadow);
    };
    DDDirective.prototype.swipe = function (point) {
        var _this = this;
        var height = this._elem.offsetHeight + this._margin.y;
        var width = this._elem.offsetWidth + this._margin.x;
        var ySet = Math.floor((point.y - this._padding.y + (height / 2)) / height) * height + this._padding.y;
        var xSet = Math.floor((point.x - this._padding.x + (width / 2)) / width) * width + this._padding.x;
        if (ySet > this._dDService.grid.maxY)
            ySet = this._dDService.grid.maxY;
        else if (ySet < this._dDService.grid.minY)
            ySet = this._dDService.grid.minY;
        if (xSet > this._dDService.grid.maxX)
            xSet = this._dDService.grid.maxX;
        else if (xSet < this._dDService.grid.minX)
            xSet = this._dDService.grid.minX;
        var invertH = point.y < this._point.y ? 1 : -1;
        var invertW = point.x < this._point.x ? 1 : -1;
        if (this._point.y !== ySet || this._point.x !== xSet) {
            this._collect.forEach(function (el) {
                if (_this._point.y !== ySet && _this.direction === 'grid') {
                    if ((_this._point.y - (0.5 * height - 1)) < el.point.y && (_this._point.y + (0.5 * height - 1)) > el.point.y && ((invertH > 0 && el.point.x < _this._point.x) || (invertH < 0 && el.point.x > _this._point.x))) {
                        _this._setElements(el, { width: invertH * width });
                    }
                    else if ((ySet + (0.5 * height - 1)) < el.point.y && (_this._point.y - (0.5 * height - 1)) > el.point.y) {
                        if (invertH > 0 && (_this._dDService.grid.maxX - (0.5 * width - 1)) < el.point.x && (_this._dDService.grid.maxX + (0.5 * width - 1)) > el.point.x) {
                            _this._setElements(el, { width: invertH * (el.point.x - _this._dDService.grid.minX) });
                            _this._setElements(el, { height: invertH * height });
                        }
                        else if (invertH < 0 && (_this._dDService.grid.minX - (0.5 * width - 1)) < el.point.x && (_this._dDService.grid.minX + (0.5 * width - 1)) > el.point.x) {
                            _this._setElements(el, { width: invertH * (el.point.x - _this._dDService.grid.maxX) });
                            _this._setElements(el, { height: invertH * height });
                        }
                        else {
                            _this._setElements(el, { width: invertH * width });
                        }
                    }
                    else if ((ySet - (0.5 * height - 1)) < el.point.y && (ySet + (0.5 * height - 1)) > el.point.y && ((invertH > 0 && el.point.x > (xSet - (0.5 * width - 1))) || ((invertH < 0 && el.point.x < (xSet + (0.5 * width - 1)))))) {
                        if (invertH > 0 && (_this._dDService.grid.maxX - (0.5 * width - 1)) < el.point.x && (_this._dDService.grid.maxX + (0.5 * width - 1)) > el.point.x) {
                            _this._setElements(el, { width: invertH * (_this._dDService.grid.minX - el.point.x) });
                            _this._setElements(el, { height: invertH * height });
                        }
                        else if (invertH < 0 && (_this._dDService.grid.minX - (0.5 * width - 1)) < el.point.x && (_this._dDService.grid.minX + (0.5 * width - 1)) > el.point.x) {
                            _this._setElements(el, { width: invertH * (el.point.x - _this._dDService.grid.maxX) });
                            _this._setElements(el, { height: invertH * height });
                        }
                        else {
                            _this._setElements(el, { width: invertH * width });
                        }
                    }
                }
                else if (_this._point.x !== xSet && (_this.direction === 'grid' || _this.direction === 'x')) {
                    if ((_this._point.y - (0.5 * height - 1)) < el.point.y && (_this._point.y + (0.5 * height - 1)) > el.point.y) {
                        if (((_this._point.x - invertW * width) - (0.5 * width - 1)) < el.point.x && ((_this._point.x - invertW * width) + (0.5 * width - 1)) > el.point.x) {
                            _this._setElements(el, { width: invertW * width });
                        }
                    }
                }
                else if (_this._point.y !== ySet && _this.direction === 'y') {
                    if ((_this._point.x - (0.5 * width - 1)) < el.point.x && (_this._point.x + (0.5 * width - 1)) > el.point.x) {
                        if (((_this._point.y - invertH * height) - (0.5 * height - 1)) < el.point.y && ((_this._point.y - invertH * height) + (0.5 * height - 1)) > el.point.y) {
                            _this._setElements(el, { height: invertH * height });
                        }
                    }
                }
            });
            this._point.y = ySet;
            this._point.x = xSet;
            this._emit('change');
            if (this.shadow)
                this._updateShadow();
        }
    };
    DDDirective.prototype._setElements = function (el, point) {
        point.height ? el.point.y += point.height : el.point.x += point.width;
        this._render.setStyle(el.el, point.height ? 'top' : 'left', (point.height ? el.point.y : el.point.x) + 'px');
    };
    DDDirective.prototype._updateShadow = function () {
        var _this = this;
        this._render.setStyle(this._dDService.shadow, 'opacity', 0);
        setTimeout(function () {
            _this._render.setStyle(_this._dDService.shadow, 'top', _this._point.y + 5 + 'px');
            _this._render.setStyle(_this._dDService.shadow, 'left', _this._point.x + 5 + 'px');
            _this._render.setStyle(_this._dDService.shadow, 'opacity', 1);
        }, 200);
    };
    DDDirective.prototype._drop = function () {
        this._emit('drop');
        if (this.direction && this.direction === 'grid')
            if (this._collect.length > 1)
                if (this._collect[this._collect.length - 1].active) {
                    if (this._collect[this._collect.length - 2].point.x + this._elem.offsetWidth > this._dDService.grid.maxX) {
                        this._point.x = this._dDService.grid.minX;
                    }
                    else {
                        this._point.x = this._collect[this._collect.length - 2].point.x + this._elem.offsetWidth + this._margin.x;
                        this._point.y = this._collect[this._collect.length - 2].point.y;
                    }
                }
        this._render.setStyle(this._elem, 'top', this._point.y + 'px');
        this._render.setStyle(this._elem, 'left', this._point.x + 'px');
    };
    DDDirective.prototype._getIEl = function () {
        return {
            point: this._point,
            active: false,
            el: this._elem,
            customEl: this.customElem || null,
        };
    };
    Object.defineProperty(DDDirective.prototype, "point", {
        set: function (coordinate) {
            var parentCoords = this._dDService.getCoords(this._parent);
            this._point = { x: Math.round(coordinate.left - parentCoords.left - this._margin.x), y: Math.round(coordinate.top - parentCoords.top - this._margin.y) };
        },
        enumerable: true,
        configurable: true
    });
    DDDirective.prototype._emit = function (type) {
        this._dDService.sorting();
        var event = {
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
    };
    DDDirective.prototype.matClick = function (event) {
        var _this = this;
        if (this.materialStyle) {
            var el_1 = this._elem, shift = this._shift;
            if (this.is && this.swipeElement) {
                el_1 = this.swipeElement;
                var coords = this._dDService.getCoords(this.swipeElement);
                shift = { x: event.pageX - coords.left, y: event.pageY - coords.top };
            }
            if (el_1.className.indexOf('btn-disabled') !== -1) {
                return;
            }
            var dia = Math.min(el_1.offsetHeight, el_1.offsetWidth, 100), ripple_1 = this._render.createElement('div');
            this._render.addClass(ripple_1, 'ripple');
            this._render.appendChild(el_1, ripple_1);
            var rippleWave = this._render.createElement('div');
            this._render.addClass(rippleWave, 'rippleWave');
            this._render.setStyle(rippleWave, 'width', dia + 'px');
            this._render.setStyle(rippleWave, 'height', dia + 'px');
            this._render.setStyle(rippleWave, 'left', (shift.x - (dia / 2)) + 'px');
            this._render.setStyle(rippleWave, 'top', (shift.y - (dia / 2)) + 'px');
            ripple_1.appendChild(rippleWave);
            rippleWave.addEventListener('animationend', function () { return _this._render.removeChild(el_1, ripple_1); });
        }
    };
    var DDDirective_1;
    DDDirective.COMP = 'D-D-MATERIAL-STYLE';
    __decorate([
        core_1.Input('ddMatStyle'),
        __metadata("design:type", Object)
    ], DDDirective.prototype, "container", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DDDirective.prototype, "config", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DDDirective.prototype, "dChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DDDirective.prototype, "dDrop", void 0);
    __decorate([
        core_1.HostListener('dragstart'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DDDirective.prototype, "onDragStart", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], DDDirective.prototype, "onMouseDown", null);
    DDDirective = DDDirective_1 = __decorate([
        core_1.Directive({
            selector: '[ddMatStyle]',
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer2,
            core_1.ComponentFactoryResolver,
            core_1.ViewContainerRef,
            d_d_service_1.DDService])
    ], DDDirective);
    return DDDirective;
}());
exports.DDDirective = DDDirective;
//# sourceMappingURL=d-d.directive.js.map