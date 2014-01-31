///<reference path="../../reference.d.ts"/>

import i0 = require("./../base/AbstractEditEntityController");
import enums = require("./../../util/EnumUtil");

export module controller.customer {
    export interface EditCustomerViewModel extends i0.controller.base.EditEntityViewModel<domain.Customer> {
        saveChanges: (customer: domain.Customer) => void;
        removeCustomer: (customer: domain.Customer) => void;
    }

    export class EditCustomerController extends i0.controller.base.AbstractEditEntityController<domain.Customer> {
        static $inject = ["$scope", "CustomerService", "AlertService"];
        constructor(public $scope: EditCustomerViewModel,
                    public CustomerService: d.service.contract.CustomerService,
                    public AlertService: d.service.contract.AlertService) {
            super($scope, "customer", CustomerService, AlertService);
            
            var customerId = this.$scope.navigator.params().customerId;
            this.findEntity(customerId || 0, ()=> {
                this.populateScope();
            });
        }

        populateScope() {
            this.$scope.saveChanges = (customer: domain.Customer) => this.saveChanges(customer);
            this.$scope.removeCustomer = (customer: domain.Customer) => this.removeEntity(customer);
        }
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("EditCustomerController", controller.customer.EditCustomerController);
};