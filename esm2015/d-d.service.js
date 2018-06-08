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
var Subject_1 = require("rxjs/Subject");
var DDService = /** @class */ (function () {
    function DDService() {
        this._collection = [];
        this.grid = { minX: 9999, maxX: -9999, minY: 9999, maxY: -9999 };
        this.change = new Subject_1.Subject();
        this.drop = new Subject_1.Subject();
    }
    DDService.prototype.add = function (el) {
        var _this = this;
        this._collection.push(el);
        this._collection.forEach(function (el) {
            _this.grid.minX = _this.grid.minX > el.point.x ? el.point.x : _this.grid.minX;
            _this.grid.maxX = _this.grid.maxX < el.point.x ? el.point.x : _this.grid.maxX;
            _this.grid.minY = _this.grid.minY > el.point.y ? el.point.y : _this.grid.minY;
            _this.grid.maxY = _this.grid.maxY < el.point.y ? el.point.y : _this.grid.maxY;
        });
    };
    DDService.prototype.sorting = function () {
        this._collection.sort(function (a, b) {
            if (a.point.x < b.point.x)
                if (a.point.y > b.point.y)
                    return -1;
                else
                    return 1;
            if (a.point.y < b.point.y)
                if (a.point.y < b.point.y)
                    return 1;
                else
                    return -1;
            else
                return -1;
        }).reverse();
    };
    Object.defineProperty(DDService.prototype, "active", {
        set: function (point) {
            this._collection.forEach(function (el) { return el.active = el.point.x === point.x && el.point.y === point.y; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DDService.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DDService.prototype, "customCollection", {
        get: function () {
            return this._collection.map(function (el) { return el.customEl; });
        },
        enumerable: true,
        configurable: true
    });
    DDService.prototype.getCoords = function (elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: Math.round(box.top + pageYOffset),
            left: Math.round(box.left + pageXOffset),
        };
    };
    DDService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], DDService);
    return DDService;
}());
exports.DDService = DDService;
//# sourceMappingURL=d-d.service.js.map