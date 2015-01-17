///<reference path="../reference.d.ts"/>
import EditCustomerCtrl = require("./controller/EditCustomerController");
import ListCustomerCtrl = require("./controller/ListCustomerController");
import customerDetailDirective = require("./directive/CustomerDetailDirective");
import CustomerServiceImpl = require("./service/CustomerServiceImpl");
import CustomerServiceMock = require("./service/CustomerServiceMock");

var CustomerModule = angular.module("lwa.customer", ["lwa.core"]);
//Controllers
CustomerModule.controller("EditCustomerCtrl", EditCustomerCtrl);
CustomerModule.controller("ListCustomerCtrl", ListCustomerCtrl);
//Services
CustomerModule.service("CustomerService", CustomerServiceMock);
//Directives
CustomerModule.directive("customerDetail", customerDetailDirective);
//Routes
CustomerModule.config(["$routeProvider", ($routeProvider: ng.IRouteProvider) => {
    $routeProvider
        .when("/customer/:customerId", {
            controller: "EditCustomerCtrl",
            templateUrl: "app/lwa.customer/view/editCustomer.html"
        })
        .when("/customer", {
            controller: "ListCustomerCtrl",
            templateUrl: "app/lwa.customer/view/listCustomer.html"
        });
}]);

export = CustomerModule;
