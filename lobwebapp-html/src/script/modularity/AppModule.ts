///<reference path="../reference.d.ts"/>

///<amd-dependency path="angular"/>
import a = require("./DirectiveModule");
import b = require("./ControllerModule");

export module modularity {
    export class AppModule {
        constructor() {
            new a.modularity.DirectiveModule();
            new b.modularity.ControllerModule();
            
            angular.module("lwa", ["lwa.directive", "lwa.controller"])
                //Throw hard exception on angular errors
                .factory('$exceptionHandler', function () {
                    return (exception, cause) => {
                        exception.message += ' (caused by "' + cause + '")';
                        throw exception;
                    };
                });
        }

        bootstrap(rootElement: any) {
            (<any>angular.element(rootElement)).ready(() => {
                angular.bootstrap(rootElement, ["lwa"]);
            });
        }
    }
}