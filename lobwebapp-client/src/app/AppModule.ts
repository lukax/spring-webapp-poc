///<reference path="reference.ts"/>

var AppModule = angular.module("lwa", ["lwa.directive", "lwa.controller"]);

AppModule
    .factory('$exceptionHandler', () => {
      return (exception, cause) => {
        console.log(exception);
        exception.message += ' (caused by "' + cause + '")';
        throw exception;
      };
    })
    ;
