///<reference path="../../reference.d.ts"/>

import abstractEditEntity = require("../../lwa.core/controller/AbstractEditEntityController");
import enumUtil = require("../../lwa.core/util/EnumUtil");

class EditCustomerController extends abstractEditEntity.AbstractEditEntityController<domain.Customer> implements abstractEditEntity.IEditEntityController<domain.Customer> {
    static $inject = ["$scope", "CustomerService", "AlertService"];
    constructor(public $scope: controller.base.IAppScope,
                public CustomerService: service.contract.CustomerService,
                public AlertService: service.contract.AlertService) {
        super($scope, CustomerService, AlertService, "/customer", "Cliente");

        this.findEntity(this.$scope.navigator.params().customerId);
    }

}

export = EditCustomerController;