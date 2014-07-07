///<reference path="../reference.d.ts"/>

module modularity {
    export class AppModule {
        constructor(public profile: string) {
            new modularity.DirectiveModule(profile);
            new modularity.ServiceModule(profile);
            new modularity.ControllerModule(profile);
            
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
