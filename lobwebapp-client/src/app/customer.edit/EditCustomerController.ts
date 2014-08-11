///<reference path="../reference.ts"/>

module customer {
  export interface IEditCustomerController extends core.IEditEntityController<customer.Customer> {
  }

  export class EditCustomerController extends core.AbstractEditEntityController<customer.Customer> implements IEditCustomerController {
    static $inject = ["$scope", "CustomerService", "AlertService", "NavigatorService"];
    constructor(public $scope:core.IAppScope,
                public CustomerService:CustomerService,
                public AlertService:core.AlertService,
                public NavigatorService:core.NavigatorService) {
      super($scope, CustomerService, AlertService, NavigatorService, "/customer", "Cliente");

      this.findEntity(this.NavigatorService.params().customerId);
    }

  }
}

customer.edit.module.controller("EditCustomerController", customer.EditCustomerController);
