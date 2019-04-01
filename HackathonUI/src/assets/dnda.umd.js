(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('dnda', ['exports', '@angular/core', '@angular/router', '@angular/common'], factory) :
    (factory((global.dnda = {}),global.ng.core,global.ng.router,global.ng.common));
}(this, (function (exports,i0,router,common) { 'use strict';

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
                this.loggedInUserId = JSON.parse(sessionStorage.getItem('user'));
            };
        DndaComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'lib-dnda',
                        template: "<div class=\"flex-container\">\n    \n    <h1>Non Disclosue Agreement</h1>\n    <div class=\"agreement-area\">\n        This Temporary Employment Contract (the \u201CContract\u201D or \u201CTemporary Employment Contract\u201D) states the terms and conditions that govern the contractual agreement between [EMPLOYER COMPANY] having its principal place of business at [COMPANY ADDRESS] (the \u201CCompany\u201D), and [TEMPORARY EMPLOYEE] (the \u201CTemp\u201D) who agrees to be bound by this Contract.\n\n        WHEREAS, the Company is engaged in the [DESCRIPTION OF BUSINESS]; and\n        \n        WHEREAS, the Company desires to employ and retain the services of the Temp on a temporary basis according to the terms and conditions herein.\n        \n        NOW, THEREFORE, In consideration of the mutual covenants and promises made by the parties hereto, the Company and the Temp (individually, each a \u201CParty\u201D and collectively, the \u201CParties\u201D) covenant and agree as follows:\n        \n        TERM. The term of this Temporary Employment Contract shall commence on [START DATE] and continue [TIME FRAME].\n        \n        PandaTip: Some temporary employment agreements last for a certain period of time and others last until the completion of a certain project. Here, you can add in, for example, \u201Cfor eight (8) weeks thereafter\u201D or \u201Cuntil the completion of the\u2026\u201D and describe the project. You can also add a \u201Cbut not to exceed twenty six (26) weeks\u201D if it is project-based with a time limit. The PandaDoc \u201CContract Page\u201D gives you more details.\n        \n        TERMINATION. The Temp agrees and acknowledges that, just as they have the right to terminate their employment with the Company at any time for any reason, the Company has the same right, and may terminate their employment with the Company at any time for any reason. Either Party may terminate said employment with written notice to the other Party.\n        \n        DUTIES. The Company shall employ the Temp as [POSITION TITLE] (the \u201CPosition\u201D). The Temp accepts employment with the Company on the terms and conditions set forth in this Temporary Employment Contract, and agrees to devote his full time and attention (reasonable periods of illness excepted) to the performance of his duties under this Agreement. In general, the Temp shall perform all the duties as described on Exhibit A attached hereto.\n        \n        HOURS OF WORK. The Temp\u2019s hours of work shall be [DAY OF WEEK] to [DAY OF WEEK] at hours determined by the employer provided that ordinary working hours shall not exceed [AMOUNT] hours per week.\n        \n        COMPENSATION. In consideration for the performance of the duties hereunder, the Temp shall be entitled to compensation as described on Exhibit B attached hereto.\n        \n        RETURN OF PROPERTY. Within Seven (7) days of the termination of this Temporary Employment Contract, whether by expiration or otherwise, the Temp agrees to return to the Company, all products, samples, or models, and all documents, retaining no copies or notes, relating to the Company\u2019s business including, but not limited to, [LIST OF ITEMS] obtained by the Temp during its representation of the Company.\n        \n        COMPANY PROCEDURES. The Temp agrees and acknowledges that he or she shall comply with the Company\u2019s established disciplinary code as well as any other rules, policies, and procedures that may be introduced from time to time. Copies of such documents are available upon request.\n        \n        NO MODIFICATION UNLESS IN WRITING. No modification of this Agreement shall be valid unless in writing and agreed upon by both Parties.\n        \n        APPLICABLE LAW. This Temporary Employment Contract and the interpretation of its terms shall be governed by and construed in accordance with the laws of the State of [STATE] and subject to the exclusive jurisdiction of the federal and state courts located in [COUNTY], [STATE].\n        \n        IN WITNESS WHEREOF, each of the Parties has executed this Temporary Employment Contract, both Parties by its duly authorized officer, as of the day and year set forth below.\n    </div>\n    <button class=\"btn btn-default\">Agree</button>\n  </div>",
                        styles: [".flex-container{width:75%;margin:0 auto;position:relative}.agreement-area{width:100%;max-height:50vh;overflow-y:scroll}button{position:absolute;right:0;margin-top:25px}"]
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
                            common.CommonModule,
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