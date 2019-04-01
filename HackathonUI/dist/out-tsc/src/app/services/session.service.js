"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Session = /** @class */ (function () {
    function Session() {
    }
    Session.prototype.setSession = function (user) {
        this.loggedInUser = user;
        sessionStorage.setItem('user', JSON.stringify(this.loggedInUser));
    };
    Session.prototype.getSessionUser = function () {
        return JSON.parse(sessionStorage.getItem('user'));
    };
    Session.prototype.expire = function () {
        this.loggedInUser = null;
        sessionStorage.removeItem('user');
    };
    Session = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], Session);
    return Session;
}());
exports.Session = Session;
//# sourceMappingURL=session.service.js.map