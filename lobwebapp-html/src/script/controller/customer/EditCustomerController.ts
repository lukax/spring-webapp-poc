///<reference path="./../../reference.d.ts"/>

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
            this.processArgs();
            this.populateScope();
        }

        processArgs() {
            var customerId = this.$scope.navigator.params().customerId;
            if (customerId > 0) {
                this.findEntity(Number(customerId));
            } else if (customerId == 0) {
                this.newEntity();
            } else if (customerId == "new") {
                this.$scope.entity = { id: 0, name: "" };
            } else {
                this.AlertService.add({ content: "Erro cliente ID inválido", type: enums.AlertType.WARNING });
                this.newEntity();
            }
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