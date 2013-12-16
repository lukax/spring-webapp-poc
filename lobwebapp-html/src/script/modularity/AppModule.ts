///<reference path="../reference.d.ts"/>
import a = require("./ControllerModule");
import b = require("./DirectiveModule");
import c = require("./FilterModule");
import d = require("./ServiceModule");

export module modularity {
    export class AppModule {
        private app: ng.IModule;
        private controllerModule: a.modularity.ControllerModule;
        private directiveModule: b.modularity.DirectiveModule;
        private filterModule: c.modularity.FilterModule;
        private serviceModule: d.modularity.ServiceModule;

        constructor() {
            this.controllerModule = new a.modularity.ControllerModule().configure();
            this.directiveModule = new b.modularity.DirectiveModule().configure();
            this.filterModule = new c.modularity.FilterModule().configure();
            this.serviceModule = new d.modularity.ServiceModule().configure();

            this.app = angular.module("lwa", ["lwa.directive", "lwa.filter", "lwa.controller"]);
        }

        bootstrap(rootElement: any) {
            (<any>angular.element(rootElement)).ready(() => {
                angular.bootstrap(rootElement, ["lwa"]);
            });
        }
    }
}