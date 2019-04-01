"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_service_1 = require("./services/module.service");
var router_service_1 = require("./services/router.service");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var angular_1 = require("@clr/angular");
var animations_1 = require("@angular/platform-browser/animations");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var http_2 = require("@angular/common/http");
var login_component_1 = require("./login/login.component");
var manage_plugins_component_1 = require("./manage-plugins/manage-plugins.component");
function createCompiler(compilerFactory) {
    return compilerFactory.createCompiler();
}
exports.createCompiler = createCompiler;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                login_component_1.LoginComponent,
                manage_plugins_component_1.ManagePluginsComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                angular_1.ClarityModule,
                http_2.HttpClientModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '', redirectTo: 'login', pathMatch: 'full',
                    },
                    {
                        path: 'login', component: login_component_1.LoginComponent
                    },
                    {
                        path: 'dashboard', component: dashboard_component_1.DashboardComponent
                    },
                    {
                        path: 'pluginmanager', component: manage_plugins_component_1.ManagePluginsComponent
                    },
                ], { useHash: true }),
                http_1.HttpModule
            ],
            providers: [router_service_1.RouterService, module_service_1.ModuleService,
                { provide: core_1.COMPILER_OPTIONS, useValue: {}, multi: true },
                { provide: core_1.CompilerFactory, useClass: platform_browser_dynamic_1.JitCompilerFactory, deps: [core_1.COMPILER_OPTIONS] },
                { provide: core_1.Compiler, useFactory: createCompiler, deps: [core_1.CompilerFactory] }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map