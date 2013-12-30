///<reference path="../reference.d.ts"/>
import a = require("./ControllerModule");
import b = require("./DirectiveModule");
import c = require("./FilterModule");
import d = require("./ServiceModule");

export module modularity {
    export class AppModule {
        constructor() {
            new a.modularity.ControllerModule();
            new b.modularity.DirectiveModule();
            new c.modularity.FilterModule();
            new d.modularity.ServiceModule();

            angular.module("lwa", ["lwa.directive", "lwa.filter", "lwa.controller"]);
        }

        bootstrap(rootElement: any) {
            (<any>angular.element(rootElement)).ready(() => {
                angular.bootstrap(rootElement, ["lwa"]);
            });
        }
    }
}