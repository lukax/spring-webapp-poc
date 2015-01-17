///<reference path="../reference.d.ts"/>
import EditStockCtrl = require("./controller/EditStockController");
import ListStockCtrl = require("./controller/ListStockController");
import StockServiceImpl = require("./service/StockServiceImpl");
import StockServiceMock = require("./service/StockServiceMock");

var StockModule = angular.module("lwa.stock", ["lwa.core"]);
//Controllers
StockModule.controller("EditStockCtrl", EditStockCtrl.EditStockController);
StockModule.controller("ListStockCtrl", ListStockCtrl.ListStockController);
//Services
StockModule.service("StockService", StockServiceMock);
//Routes
StockModule.config(["$routeProvider", ($routeProvider: ng.IRouteProvider) => {
    $routeProvider
        .when("/stock/:stockId", {
            controller: "EditStockCtrl",
            templateUrl: "app/lwa.stock/view/editStock.html"
        })
        .when("/stock", {
            controller: "ListStockCtrl",
            templateUrl: "app/lwa.stock/view/listStock.html"
        });
}]);

export = StockModule;
