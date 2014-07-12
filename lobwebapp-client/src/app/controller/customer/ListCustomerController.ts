///<reference path="../../reference.ts"/>

module controller.customer {
    export interface IListCustomerController extends controller.base.IListEntityController<domain.Customer>{
    }

    export class ListCustomerController extends controller.base.AbstractListEntityController<domain.Customer> implements IListCustomerController{
        static $inject = ["$scope", "CustomerService", "AlertService", "NavigatorService"];
        constructor(public $scope: controller.base.IAppScope,
                    public CustomerService: service.contract.CustomerService,
                    public AlertService: service.contract.AlertService,
                    public NavigatorService:service.contract.NavigatorService) {
            super($scope, CustomerService, AlertService, NavigatorService, "/customer", "customerId");

            this.listEntity(0);
        }

    }
}

ControllerModule.controller("ListCustomerController", controller.customer.ListCustomerController);
