///<reference path="../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");
import i0 = require("./../base/AbstractListEntityController");

export module controller.customer {
    export interface IListCustomerController extends i0.controller.base.IListEntityController<domain.Customer>{
    }

    export class ListCustomerController extends i0.controller.base.AbstractListEntityController<domain.Customer> implements IListCustomerController{
        static $inject = ["$scope", "CustomerService", "AlertService"];
        constructor(public $scope: d.controller.base.IAppScope,
                    public CustomerService: d.service.contract.CustomerService,
                    public AlertService: d.service.contract.AlertService) {
            super($scope, CustomerService, AlertService, "/customer", "customerId");

            this.listEntity(0);
        }

    }
}

export var register = (module: ng.ILazyModule) => {
  module.controller("ListCustomerController", controller.customer.ListCustomerController);
};
