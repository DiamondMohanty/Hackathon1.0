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
var module_service_1 = require("../services/module.service");
// RxJS
require("rxjs/add/operator/do");
var session_service_1 = require("../services/session.service");
var router_1 = require("@angular/router");
var router_service_1 = require("../services/router.service");
var common_service_1 = require("../services/common.service");
var ManagePluginsComponent = /** @class */ (function () {
    function ManagePluginsComponent(routerService, moduleService, session, router, commonService) {
        this.routerService = routerService;
        this.moduleService = moduleService;
        this.session = session;
        this.router = router;
        this.commonService = commonService;
        this.errorVisible = false;
    }
    ManagePluginsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = this.session.getSessionUser();
        if (this.currentUser == undefined) {
            this.router.navigateByUrl('');
        }
        this.moduleService.loadModulesForManage(this.currentUser).subscribe(function (res) { return _this.installedModules$ = res; });
    };
    ManagePluginsComponent.prototype.enableModule = function (moduleToModify) {
        // enable or disable module
        /*if(this.isRegistered(moduleToEnable)) {
            this.routerService.unRegisterRoute(moduleToEnable.path);
        } else {
            this.registerRoute(moduleToEnable);
        }*/
        var _this = this;
        var addOrRemove = "";
        if (moduleToModify.registered == false) {
            addOrRemove = "A";
        }
        else {
            addOrRemove = "D";
        }
        this.commonService.addRemoveModule(moduleToModify.moduleId, this.currentUser.userId, addOrRemove).subscribe(function (_) {
            _this.moduleService.loadModulesForManage(_this.currentUser).subscribe(function (res) { return _this.installedModules$ = res; });
        });
    };
    ManagePluginsComponent.prototype.isRegistered = function (moduleData) {
        return this.routerService.routeIsRegistered(moduleData.path);
    };
    ManagePluginsComponent.prototype.registerRoute = function (moduleToEnable) {
        var _this = this;
        // load up the umd file and register the route whenever succeeded.
        this.moduleService.loadModuleSystemJS(moduleToEnable).then(function (exports) {
            _this.routerService.createAndRegisterRoute(moduleToEnable, exports);
        }, function (err) { return _this.showError(moduleToEnable.moduleName + " could not be found, did you copy the umd file to " + moduleToEnable.location + "?", err); });
    };
    ManagePluginsComponent.prototype.showError = function (message, err) {
        this.errorMessage = message;
        this.errorVisible = true;
        console.log(err); // Log error in console
    };
    ManagePluginsComponent.prototype.closeError = function () {
        this.errorVisible = false;
    };
    ManagePluginsComponent = __decorate([
        core_1.Component({
            templateUrl: './manage-plugins.component.html',
            styleUrls: ['./manage-plugins.component.css']
        }),
        __metadata("design:paramtypes", [router_service_1.RouterService,
            module_service_1.ModuleService,
            session_service_1.Session,
            router_1.Router,
            common_service_1.CommonService])
    ], ManagePluginsComponent);
    return ManagePluginsComponent;
}());
exports.ManagePluginsComponent = ManagePluginsComponent;
//# sourceMappingURL=manage-plugins.component.js.map