///<reference path="../../reference.d.ts"/>

import abstractListEntity = require("./../base/AbstractListEntityController");
import enumUtil = require("./../../util/EnumUtil");

export interface IListCustomerController extends abstractListEntity.IListEntityController<domain.Customer> {
}

export class ListCustomerController extends abstractListEntity.AbstractListEntityController<domain.Customer> implements IListCustomerController {
    static $inject = ["$scope", "CustomerService", "AlertService"];
    constructor(public $scope: controller.base.IAppScope,
        public CustomerService: service.contract.CustomerService,
        public AlertService: service.contract.AlertService) {
        super($scope, CustomerService, AlertService, "/customer", "customerId");

        this.listEntity(0);
    }

}