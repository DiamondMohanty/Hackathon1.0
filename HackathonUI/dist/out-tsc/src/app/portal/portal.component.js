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
var module_service_1 = require("./../services/module.service");
var core_1 = require("@angular/core");
var router_service_1 = require("../services/router.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var PortalComponent = /** @class */ (function () {
    function PortalComponent(routerService, moduleService) {
        this.routerService = routerService;
        this.moduleService = moduleService;
        this.errorVisible = false;
    }
    PortalComponent.prototype.ngOnInit = function () {
        var _this = this;
        // please note: modules.json will alwasy return registered as false.
        this.installedModules$ = this.moduleService.loadModules().do(function (res) {
            return res.forEach(function (x) {
                if (x.registered)
                    _this.registerRoute(x);
            });
        });
    };
    PortalComponent.prototype.enableModule = function (moduleToEnable) {
        // enable or disable module
        if (this.isRegistered(moduleToEnable)) {
            this.routerService.unRegisterRoute(moduleToEnable.path);
        }
        else {
            this.registerRoute(moduleToEnable);
        }
    };
    PortalComponent.prototype.isRegistered = function (moduleData) {
        return this.routerService.routeIsRegistered(moduleData.path);
    };
    PortalComponent.prototype.registerRoute = function (moduleToEnable) {
        var _this = this;
        // load up the umd file and register the route whenever succeeded.
        this.moduleService.loadModule(moduleToEnable).subscribe(function (exports) {
            _this.routerService.createAndRegisterRoute(moduleToEnable, exports);
        }, function () { return _this.showError(moduleToEnable.moduleName + " could not be found, did you copy the umd file to " + moduleToEnable.location + "?"); });
    };
    PortalComponent.prototype.showError = function (message) {
        this.errorMessage = message;
        this.errorVisible = true;
    };
    PortalComponent.prototype.closeError = function () {
        this.errorVisible = false;
    };
    PortalComponent = __decorate([
        core_1.Component({
            selector: 'portal',
            templateUrl: 'portal.component.html'
        }),
        __metadata("design:paramtypes", [router_service_1.RouterService, module_service_1.ModuleService])
    ], PortalComponent);
    return PortalComponent;
}());
exports.PortalComponent = PortalComponent;
//# sourceMappingURL=portal.component.js.map