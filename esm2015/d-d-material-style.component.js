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
var d_d_directive_1 = require("./d-d.directive");
var d_d_service_1 = require("./d-d.service");
var DDMaterialStyleComponent = /** @class */ (function () {
    function DDMaterialStyleComponent(_dDService) {
        this._dDService = _dDService;
        this.dChange = new core_1.EventEmitter();
        this.dDrop = new core_1.EventEmitter();
        this._materialStyle = true;
        this._shadow = false;
    }
    Object.defineProperty(DDMaterialStyleComponent.prototype, "config", {
        set: function (config) {
            if (config) {
                this._direction = config.direction || null;
                this._materialStyle = config.matClick !== undefined ? config.matClick : true;
                this._shadow = config.shadow !== undefined ? config.shadow : false;
                this._customCollection = config.collection || null;
                this._swipe = config.swipe || null;
            }
        },
        enumerable: true,
        configurable: true
    });
    DDMaterialStyleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._dDService.drop.subscribe(function (event) { return _this._sendEvent(event); });
        this._dDService.change.subscribe(function (event) { return _this._sendEvent(event); });
    };
    DDMaterialStyleComponent.prototype._sendEvent = function (event) {
        switch (event.type) {
            case 'change':
                this.dChange.emit(event);
                break;
            case 'drop':
                this.dDrop.emit(event);
                break;
        }
    };
    DDMaterialStyleComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.collection.forEach(function (el, index) {
            el.direction = el.direction ? el.direction : _this._direction;
            el.materialStyle = el.materialStyle ? el.materialStyle : _this._materialStyle;
            el.shadow = el.shadow ? el.shadow : _this._shadow;
            el.customElem = el.customElem ? el.customElem : (_this._customCollection ? (_this._customCollection[index] || null) : null);
            el.swipeElement = el.swipeElement ? el.swipeElement : _this._swipe;
            el.dDservice = _this._dDService;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DDMaterialStyleComponent.prototype, "config", null);
    __decorate([
        core_1.ContentChildren(d_d_directive_1.DDDirective),
        __metadata("design:type", core_1.QueryList)
    ], DDMaterialStyleComponent.prototype, "collection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DDMaterialStyleComponent.prototype, "dChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DDMaterialStyleComponent.prototype, "dDrop", void 0);
    DDMaterialStyleComponent = __decorate([
        core_1.Component({
            selector: 'd-d-material-style',
            template: "<ng-content></ng-content>",
            styleUrls: ['./d-d.component.scss'],
            providers: [d_d_service_1.DDService],
        }),
        __metadata("design:paramtypes", [d_d_service_1.DDService])
    ], DDMaterialStyleComponent);
    return DDMaterialStyleComponent;
}());
exports.DDMaterialStyleComponent = DDMaterialStyleComponent;
//# sourceMappingURL=d-d-material-style.component.js.map