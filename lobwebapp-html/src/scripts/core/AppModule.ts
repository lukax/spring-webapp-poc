///<reference path="../reference.ts"/>

var AppModule = angular.module("lwa", ["lwa.directive", "lwa.controller"]);

AppModule
    .factory('$exceptionHandler', core.AppModuleConfig.exceptionHandlerCfg)
    ;

module core {
    export class AppModuleConfig {
        static exceptionHandlerCfg() {
            return (exception, cause) => {
                console.log(exception);
                exception.message += ' (caused by "' + cause + '")';
                throw exception;
            };
        }

        static bootstrap(rootElement:any) {
            (<any>angular.element(rootElement)).ready(() => {
                angular.bootstrap(rootElement, ["lwa"]);
            });
        }
    }
}