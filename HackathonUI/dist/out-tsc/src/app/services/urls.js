"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UrlService = /** @class */ (function () {
    function UrlService() {
        this.baseUrl = 'http://localhost:5000/api/1.0/';
    }
    //baseUrl = 'https://ELEMONEATERS.pythonanywhere.com/api/1.0/';
    UrlService.prototype.all_modules = function () {
        return this.baseUrl + 'modules/all';
    };
    UrlService.prototype.reg_modules = function () {
        return this.baseUrl + 'modules/registered';
    };
    UrlService.prototype.login = function () {
        return this.baseUrl + 'login';
    };
    UrlService.prototype.manage_modules = function () {
        return this.baseUrl + 'modules/manage';
    };
    UrlService.prototype.add_remove_modules = function () {
        return this.baseUrl + 'team_module/modify';
    };
    UrlService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UrlService);
    return UrlService;
}());
exports.UrlService = UrlService;
//# sourceMappingURL=urls.js.map