///<reference path="../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");
import i0 = require("./../base/AbstractListEntityController");

export module controller.customer {
    export interface ListCustomerViewModel extends i0.controller.base.ListEntityViewModel<domain.Customer>{
    }

    export class ListCustomerController extends i0.controller.base.AbstractListEntityController<domain.Customer>{
        static $inject = ["$scope", "CustomerService", "AlertService"];
        constructor(public $scope: ListCustomerViewModel,
                    public CustomerService: d.service.contract.CustomerService,
                    public AlertService: d.service.contract.AlertService) {
            super($scope, CustomerService, AlertService, "/customer", "customerId");
            
            this.listEntity(0);
        }
        
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("ListCustomerController", controller.customer.ListCustomerController);
};