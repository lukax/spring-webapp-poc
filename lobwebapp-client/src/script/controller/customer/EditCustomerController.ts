///<reference path="../../reference.d.ts"/>

import abstractEditEntity = require("./../base/AbstractEditEntityController");
import enumUtil = require("./../../util/EnumUtil");

export interface IEditCustomerController extends abstractEditEntity.IEditEntityController<domain.Customer> {
}

export class EditCustomerController extends abstractEditEntity.AbstractEditEntityController<domain.Customer> implements IEditCustomerController {
    static $inject = ["$scope", "CustomerService", "AlertService"];
    constructor(public $scope: controller.base.IAppScope,
                public CustomerService: service.contract.CustomerService,
                public AlertService: service.contract.AlertService) {
        super($scope, CustomerService, AlertService, "/customer", "Cliente");

        this.findEntity(this.$scope.navigator.params().customerId);
    }

}
