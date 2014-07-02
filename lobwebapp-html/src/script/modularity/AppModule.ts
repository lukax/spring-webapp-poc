///<reference path="../reference.d.ts"/>

///<amd-dependency path="angular"/>
import a = require("./DirectiveModule");
import b = require("./ServiceModule");
import c = require("./ControllerModule");

export module modularity {
    export class AppModule {
        constructor(public profile: string) {
            new a.modularity.DirectiveModule(profile);
            new b.modularity.ServiceModule(profile);
            new c.modularity.ControllerModule(profile);
            
            angular.module("lwa", ["lwa.directive", "lwa.controller"])
                //Throw hard exception on angular errors
                .factory('$exceptionHandler', function () {
                    return (exception, cause) => {
                        console.log(exception);
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