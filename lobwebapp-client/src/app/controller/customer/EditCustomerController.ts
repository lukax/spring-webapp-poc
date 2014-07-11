///<reference path="../../reference.ts"/>

module controller.customer {
  export interface IEditCustomerController extends controller.base.IEditEntityController<domain.Customer> {
  }

  export class EditCustomerController extends controller.base.AbstractEditEntityController<domain.Customer> implements IEditCustomerController {

    static $inject = ["$scope", "CustomerService", "AlertService"];
    constructor(public $scope:controller.base.IAppScope,
                public CustomerService:service.contract.CustomerService,
                public AlertService:service.contract.AlertService) {
      super($scope, CustomerService, AlertService, "/customer", "Cliente");

      this.findEntity(this.$scope.navigator.params().customerId);
    }

  }
}

ControllerModule.controller("EditCustomerController", controller.customer.EditCustomerController);
