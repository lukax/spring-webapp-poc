///<reference path='./../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='./ControllerModule.ts'/>
///<reference path='./DirectiveModule.ts'/>
///<reference path='./FilterModule.ts'/>

import angular = require('angular');
import module_c = require('./ControllerModule');
import module_d = require('./DirectiveModule');
import module_f = require('./FilterModule');

export class AppModule {
    private appNgModule: ng.IModule;
    private controllerModule: module_c.ControllerModule;
    private directiveModule: module_d.DirectiveModule;
    private filterModule: module_f.FilterModule;
        
    constructor() {

        this.controllerModule = new module_c.ControllerModule().configure();
        this.directiveModule = new module_d.DirectiveModule().configure();
        this.filterModule = new module_f.FilterModule().configure();
        this.appNgModule = angular.module('lwa', ['lwaDirectiveModule', 'lwaFilterModule', 'lwaControllerModule']);
    }

    bootstrap(rootElement: any){
        angular.element(rootElement).ready(() => {
            angular.bootstrap(rootElement, ['lwa']);
        });
    }
}
