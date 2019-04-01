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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var RouterService = /** @class */ (function () {
    function RouterService(router, compiler, http) {
        this.router = router;
        this.compiler = compiler;
        this.http = http;
        this.existingRoutes = new rxjs_1.BehaviorSubject(this.routes);
    }
    Object.defineProperty(RouterService.prototype, "routes", {
        get: function () {
            var routesToReturn = this.router.config;
            return routesToReturn.filter(function (x) { return x.path !== ""; });
        },
        enumerable: true,
        configurable: true
    });
    RouterService.prototype.createAndRegisterRoute = function (moduleToRegister, exports) {
        var route = {
            path: moduleToRegister.path,
            loadChildren: function () { return exports["" + moduleToRegister.moduleName]; }
        };
        this.registerRoute(route);
    };
    RouterService.prototype.routeIsRegistered = function (path) {
        return this.router.config.filter(function (r) { return r.path === path; }).length > 0;
    };
    RouterService.prototype.registerRoute = function (route) {
        if (this.routeIsRegistered(route.path))
            return;
        this.router.config.push(route);
        this.updateRouteConfig(this.router.config);
    };
    RouterService.prototype.unRegisterRoute = function (path) {
        console.log("Unregister", path);
        this.updateRouteConfig(this.router.config.filter(function (route) { return route.path !== path; }));
    };
    RouterService.prototype.updateRouteConfig = function (config) {
        this.router.resetConfig(config);
        this.existingRoutes.next(this.routes);
    };
    RouterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, core_1.Compiler, http_1.Http])
    ], RouterService);
    return RouterService;
}());
exports.RouterService = RouterService;
//# sourceMappingURL=router.service.js.map