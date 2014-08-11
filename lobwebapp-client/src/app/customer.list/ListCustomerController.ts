///<reference path="../reference.ts"/>

module customer.list {
  export interface IListCustomerController extends core.IListEntityController<customer.Customer> {
  }

  export class ListCustomerController extends core.AbstractListEntityController<customer.Customer> implements IListCustomerController {
    static $inject = ["$scope", "CustomerService", "AlertService"];
    constructor(public $scope:core.IAppScope,
                public CustomerService:customer.CustomerService,
                public AlertService:core.AlertService,
                public NavigatorService:core.NavigatorService) {
      super($scope, CustomerService, AlertService, NavigatorService, "/customer", "customerId");

      this.listEntity(0);
    }

  }
}

customer.list.module.controller("ListCustomerController", customer.EditCustomerController);
