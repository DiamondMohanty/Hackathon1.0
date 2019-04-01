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
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
// Needed for the new modules
var AngularCore = require("@angular/core");
var AngularCommon = require("@angular/common");
var AngularRouter = require("@angular/router");
var AngularClarity = require("@clr/angular");
var BrowserAnimations = require("@angular/platform-browser/animations");
var urls_1 = require("./urls");
var session_service_1 = require("./session.service");
var http_2 = require("@angular/common/http");
var ModuleService = /** @class */ (function () {
    function ModuleService(compiler, http, urlService, session, httpClient) {
        this.compiler = compiler;
        this.http = http;
        this.urlService = urlService;
        this.session = session;
        this.httpClient = httpClient;
        this.source = "http://" + window.location.host + "/";
    }
    ModuleService.prototype.loadModules = function () {
        /*return this.http.get("./assets/modules.json")
            .map(res => res.json()); */
        return this.httpClient.get(this.urlService.all_modules()).map(function (res) { return res['data']; });
    };
    ModuleService.prototype.loadModulesForUser = function (user) {
        var headers = { headers: new http_2.HttpHeaders({ 'Content-Type': 'application/json' }) };
        var user_info = {
            'user_id': user.userId
        };
        return this.httpClient.post(this.urlService.reg_modules(), user_info, headers).map(function (res) { return res['data']; });
    };
    ModuleService.prototype.loadModulesForManage = function (user) {
        var headers = { headers: new http_2.HttpHeaders({ 'Content-Type': 'application/json' }) };
        var user_info = {
            'user_id': user.userId
        };
        return this.httpClient.post(this.urlService.manage_modules(), user_info, headers).map(function (res) { return res['data']; });
    };
    ModuleService.prototype.loadModule = function (moduleInfo) {
        var _this = this;
        var url = this.source + moduleInfo.location;
        return this.http.get(url)
            .map(function (res) { return res.text(); })
            .map(function (source) {
            var exports = {}; // this will hold module exports
            var modules = {
                '@angular/core': AngularCore,
                '@angular/common': AngularCommon,
                '@angular/router': AngularRouter,
                '@angular/platform-browser/animations': BrowserAnimations,
                '@clr/angular': AngularClarity
            };
            // shim 'require' and eval
            var require = function (module) { return modules[module]; };
            eval(source);
            // Need to check if there is another solution for eval as this is described as 'Evil'
            _this.compiler.compileModuleAndAllComponentsSync(exports["" + moduleInfo.moduleName]);
            //console.log(exports); // disabled as this object is cleared anyway
            return exports;
        });
    };
    ModuleService.prototype.loadModuleSystemJS = function (moduleInfo) {
        var _this = this;
        var url = this.source + moduleInfo.location;
        SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
        SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
        SystemJS.set('@angular/router', SystemJS.newModule(AngularRouter));
        SystemJS.set('@angular/platform-browser/animations', SystemJS.newModule(BrowserAnimations));
        SystemJS.set('@clr/angular', SystemJS.newModule(AngularClarity));
        // now, import the new module
        return SystemJS.import("" + url).then(function (module) {
            console.log(module);
            return _this.compiler.compileModuleAndAllComponentsAsync(module["" + moduleInfo.moduleName]).then(function (compiled) {
                console.log(compiled);
                return module;
            });
        });
    };
    ModuleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.Compiler,
            http_1.Http,
            urls_1.UrlService,
            session_service_1.Session,
            http_2.HttpClient])
    ], ModuleService);
    return ModuleService;
}());
exports.ModuleService = ModuleService;
//# sourceMappingURL=module.service.js.map