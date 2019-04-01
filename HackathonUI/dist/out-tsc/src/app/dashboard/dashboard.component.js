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
var router_service_1 = require("../services/router.service");
var module_service_1 = require("../services/module.service");
// RxJS
require("rxjs/add/operator/do");
var session_service_1 = require("../services/session.service");
var router_1 = require("@angular/router");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(routerService, moduleService, session, router) {
        this.routerService = routerService;
        this.moduleService = moduleService;
        this.session = session;
        this.router = router;
        this.errorVisible = false;
        this.existingRoutes$ = this.routerService.existingRoutes;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.session.getSessionUser();
        if (this.currentUser == undefined) {
            this.router.navigateByUrl('');
        }
        this.moduleService.loadModulesForUser(this.currentUser).subscribe(function (res) {
            var allModules = res;
            _this.installedModules$ = allModules;
            allModules.forEach(function (x) {
                if (x.registered)
                    _this.registerRoute(x);
            });
        });
    };
    DashboardComponent.prototype.registerRoute = function (moduleToEnable) {
        var _this = this;
        // load up the umd file and register the route whenever succeeded.
        this.moduleService.loadModuleSystemJS(moduleToEnable).then(function (exports) {
            _this.routerService.createAndRegisterRoute(moduleToEnable, exports);
        }, function (err) { return _this.showError(moduleToEnable.moduleName + " could not be found, did you copy the umd file to " + moduleToEnable.location + "?", err); });
    };
    DashboardComponent.prototype.showError = function (message, err) {
        this.errorMessage = message;
        this.errorVisible = true;
        console.log(err); // Log error in console
    };
    DashboardComponent.prototype.closeError = function () {
        this.errorVisible = false;
    };
    DashboardComponent.prototype.performModuleChangeTo = function (path) {
        this.router.navigateByUrl(path);
    };
    DashboardComponent.prototype.showAllPlugins = function () {
        this.router.navigateByUrl('pluginmanager');
    };
    DashboardComponent = __decorate([
        core_1.Component({
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        }),
        __metadata("design:paramtypes", [router_service_1.RouterService,
            module_service_1.ModuleService,
            session_service_1.Session,
            router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map