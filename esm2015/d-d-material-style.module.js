"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var d_d_directive_1 = require("./d-d.directive");
var d_d_component_1 = require("./d-d.component");
var d_d_material_style_component_1 = require("./d-d-material-style.component");
var d_d_service_1 = require("./d-d.service");
var DDMaterialStyleModule = /** @class */ (function () {
    function DDMaterialStyleModule() {
    }
    DDMaterialStyleModule = __decorate([
        core_1.NgModule({
            declarations: [
                d_d_directive_1.DDDirective,
                d_d_component_1.DDComponent,
                d_d_material_style_component_1.DDMaterialStyleComponent,
            ],
            exports: [
                d_d_directive_1.DDDirective,
                d_d_material_style_component_1.DDMaterialStyleComponent,
            ],
            providers: [
                d_d_service_1.DDService,
            ],
            entryComponents: [
                d_d_component_1.DDComponent,
            ],
        })
    ], DDMaterialStyleModule);
    return DDMaterialStyleModule;
}());
exports.DDMaterialStyleModule = DDMaterialStyleModule;
//# sourceMappingURL=d-d-material-style.module.js.map