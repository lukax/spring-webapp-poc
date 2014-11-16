///<reference path="../reference.d.ts"/>

///<amd-dependency path="angular"/>
import DirectiveModule = require("./DirectiveModule");
import ServiceModule = require("./ServiceModule");
import ControllerModule = require("./ControllerModule");

class AppModule {
    constructor(public profile: string) {
        new DirectiveModule(profile);
        new ServiceModule(profile);
        new ControllerModule(profile);

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
export = AppModule;