///<reference path="../reference.d.ts"/>
///<amd-dependency path="angularRoute"/>
///<amd-dependency path="angularAnimate"/>
///<amd-dependency path="angularUi"/>
///<amd-dependency path="angularUiUtils"/>
///<amd-dependency path="angularUiBootstrap"/>
import AlertService = require("./service/AlertServiceMock");
import NavigatorService = require("./service/NavigatorServiceImpl");
import Progress = require("./util/Progress");
import EnumUtil = require("./util/EnumUtil");
import AlertCtrl = require("./controller/AlertController");
import MainNavbarController = require("./controller/MainNavbarController");
import formUtilsDirective = require("./directive/FormUtilsDirective");
import imageUploadDirective = require("./directive/ImageUploadDirective");
import listUtilsDirective = require("./directive/ListUtilsDirective");
import quickSearchDirective = require("./directive/QuickSearchDirective");


var CoreModule = angular.module("lwa.core", [
    "ngRoute",
    "ngAnimate",
    "ui.bootstrap",
    "ui.utils"]);
//Controllers
CoreModule.controller("AlertCtrl", AlertCtrl.AlertController);
CoreModule.controller("MainNavbarCtrl", MainNavbarController);
//Services
CoreModule.service("AlertService", AlertService);
CoreModule.service("NavigatorService", NavigatorService);
CoreModule.service("Progress", Progress);
//Constants
CoreModule.constant("EnumUtil", EnumUtil);
//Directives
CoreModule.directive("entityId", formUtilsDirective.EntityIdDirective);
CoreModule.directive("formItem", formUtilsDirective.FormItemDirective);
CoreModule.directive("saveChanges", formUtilsDirective.SaveChangesDirective);
CoreModule.directive("listPager", listUtilsDirective.ListPagerDirective);
CoreModule.directive("searchBar", listUtilsDirective.SearchBarDirective);
CoreModule.directive("quickSearch", quickSearchDirective.QuickSearchDirective);
//Routes
CoreModule.config(["$routeProvider", ($routeProvider: ng.IRouteProvider) => {

}]);
CoreModule.config(["$locationProvider", ($locationProvider: ng.ILocationProvider) => {
    $locationProvider.html5Mode(true).hashPrefix("!");
}]);
//Setup navigator $scope global variable
CoreModule.run(["$rootScope", "NavigatorService", ($rootScope: controller.base.IAppScope, NavigatorService: service.contract.NavigatorService) => {
    $rootScope.navigator = NavigatorService;
}]);
//Throw hard exception on angular errors
CoreModule.factory('$exceptionHandler', function () {
    return (exception, cause) => {
        console.log(exception);
        exception.message += ' (caused by "' + cause + '")';
        throw exception;
    };
});

export = CoreModule;
