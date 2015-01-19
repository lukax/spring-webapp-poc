///<reference path="../reference.d.ts"/>
import EditProductCtrl = require("./controller/EditProductController");
import ListProductCtrl = require("./controller/ListProductController");
import productDetailDirective = require("./directive/ProductDetailDirective");
import ProductServiceImpl = require("./service/ProductServiceImpl");
import ProductServiceMock = require("./service/ProductServiceMock");

var ProductModule = angular.module("lwa.product", ["lwa.core"]);
//Controllers
ProductModule.controller("EditProductCtrl", EditProductCtrl.EditProductController);
ProductModule.controller("ListProductCtrl", ListProductCtrl);
//Services
//ProductModule.service("ProductService", ProductServiceImpl);
ProductModule.service("ProductService", ProductServiceMock);
//Directives
ProductModule.directive("productDetail", productDetailDirective);
//Routes
ProductModule.config(["$routeProvider", ($routeProvider: ng.IRouteProvider) => {
    $routeProvider
        .when("/product/:productId", {
            controller: "EditProductCtrl",
            templateUrl: "app/lwa.product/view/editProduct.html"
        })
        .when("/product", {
            controller: "ListProductCtrl",
            templateUrl: "app/lwa.product/view/listProduct.html"
        });
}]);

export = ProductModule;
