///<reference path="../../reference.ts"/>

module controller.customer {
  export interface IEditCustomerController extends controller.base.IEditEntityController<domain.Customer> {
  }

  export class EditCustomerController extends controller.base.AbstractEditEntityController<domain.Customer> implements IEditCustomerController {

    static $inject = ["$scope", "CustomerService", "AlertService", "NavigatorService"];
    constructor(public $scope:controller.base.IAppScope,
                public CustomerService:service.contract.CustomerService,
                public AlertService:service.contract.AlertService,
                public NavigatorService:service.contract.NavigatorService) {
      super($scope, CustomerService, AlertService, NavigatorService, "/customer", "Cliente");

      this.findEntity(this.NavigatorService.params().customerId);
    }

  }
}

ControllerModule.controller("EditCustomerController", controller.customer.EditCustomerController);
