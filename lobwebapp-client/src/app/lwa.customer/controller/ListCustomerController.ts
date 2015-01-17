///<reference path="../../reference.d.ts"/>

import abstractListEntity = require("../../lwa.core/controller/AbstractListEntityController");
import enumUtil = require("../../lwa.core/util/EnumUtil");

class ListCustomerController extends abstractListEntity.AbstractListEntityController<domain.Customer> implements abstractListEntity.IListEntityController<domain.Customer> {
    static $inject = ["$scope", "CustomerService", "AlertService"];
    constructor(public $scope: controller.base.IAppScope,
        public CustomerService: service.contract.CustomerService,
        public AlertService: service.contract.AlertService) {
        super($scope, CustomerService, AlertService, "/customer", "customerId");

        this.listEntity(0);
    }

}

export = ListCustomerController;
