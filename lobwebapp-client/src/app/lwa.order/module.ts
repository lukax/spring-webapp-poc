///<reference path="../reference.d.ts"/>
import EditOrderCtrl = require("./controller/EditOrderController");
import ListOrderCtrl = require("./controller/ListOrderController");
import GraphOrderCtrl = require("./controller/GraphOrderController");
import OrderServiceImpl = require("./service/OrderServiceImpl");
import OrderServiceMock = require("./service/OrderServiceMock");
import PaymentDetail = require("./directive/PaymentDetailDirective");

var OrderModule = angular.module("lwa.order", ["lwa.core", "lwa.product"]);
//Controllers
OrderModule.controller("EditOrderCtrl", EditOrderCtrl.EditOrderController);
OrderModule.controller("ListOrderCtrl", ListOrderCtrl.ListOrderController);
OrderModule.controller("GraphOrderCtrl", GraphOrderCtrl.GraphOrderController);
//Services
//OrderModule.service("OrderService", OrderServiceImpl);
OrderModule.service("OrderService", OrderServiceMock);
//Directives
OrderModule.directive("paymentDetail", PaymentDetail.PaymentDetailDirective);
//Filters
OrderModule.filter("paymentStatus", PaymentDetail.PaymentStatusFilter);
OrderModule.filter("paymentMode", PaymentDetail.PaymentModeFilter);
//Routes
OrderModule.config(["$routeProvider", ($routeProvider: ng.IRouteProvider) => {
    $routeProvider
      .when("/order", {
        controller: "ListOrderCtrl",
        templateUrl: "app/lwa.order/view/listOrder.html"
      })
      .when("/order/graph", {
        controller: "GraphOrderCtrl",
        templateUrl: "app/lwa.order/view/graphOrder.html"
      })
      .when("/order/:orderId", {
        controller: "EditOrderCtrl",
        templateUrl: "app/lwa.order/view/editOrder.html"
      })
      ;
}]);

export = OrderModule;
