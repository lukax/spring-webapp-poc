///<reference path="./../reference.d.ts"/>
///<amd-dependency path="angular"/>
import a = require('./ControllerModule');
import b = require('./DirectiveModule');
import c = require('./FilterModule');

export module modularity {
    export class AppModule {
        private appNgModule: ng.IModule;
        private controllerModule: a.modularity.ControllerModule;
        private directiveModule: b.modularity.DirectiveModule;
        private filterModule: c.modularity.FilterModule;

        constructor() {

            this.controllerModule = new a.modularity.ControllerModule().configure();
            this.directiveModule = new b.modularity.DirectiveModule().configure();
            this.filterModule = new c.modularity.FilterModule().configure();
            this.appNgModule = angular.module('lwa', ['lwa.directive', 'lwa.filter', 'lwa.controller']);
        }

        bootstrap(rootElement: any) {
            (<any>angular.element(rootElement)).ready(() => {
                angular.bootstrap(rootElement, ['lwa']);
            });
        }
    }
}