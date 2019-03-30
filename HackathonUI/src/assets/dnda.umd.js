(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('dnda', ['exports', '@angular/core', '@angular/router'], factory) :
    (factory((global.dnda = {}),global.ng.core,global.ng.router));
}(this, (function (exports,i0,router) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DndaService = /** @class */ (function () {
        function DndaService() {
        }
        DndaService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        DndaService.ctorParameters = function () { return []; };
        /** @nocollapse */ DndaService.ngInjectableDef = i0.defineInjectable({ factory: function DndaService_Factory() { return new DndaService(); }, token: DndaService, providedIn: "root" });
        return DndaService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DndaComponent = /** @class */ (function () {
        function DndaComponent() {
        }
        /**
         * @return {?}
         */
        DndaComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        DndaComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'lib-dnda',
                        template: "FIll the digital NDA to approve"
                    }] }
        ];
        /** @nocollapse */
        DndaComponent.ctorParameters = function () { return []; };
        return DndaComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DndaModule = /** @class */ (function () {
        function DndaModule() {
        }
        DndaModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [DndaComponent],
                        imports: [
                            router.RouterModule.forChild([
                                {
                                    path: '', pathMatch: 'full', component: DndaComponent
                                }
                            ])
                        ],
                        exports: [DndaComponent]
                    },] }
        ];
        return DndaModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.DndaService = DndaService;
    exports.DndaComponent = DndaComponent;
    exports.DndaModule = DndaModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=dnda.umd.js.map