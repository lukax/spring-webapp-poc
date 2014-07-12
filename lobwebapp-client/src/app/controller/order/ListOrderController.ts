///<reference path="../../reference.ts"/>

module controller.order {
    export interface IListOrderController extends controller.base.IListEntityController<domain.Order> {
    }

    export class ListOrderController extends controller.base.AbstractListEntityController<domain.Order>{
        static $inject = ["$scope", "OrderService", "AlertService", "NavigatorService"];
        constructor(public $scope: controller.base.IAppScope,
                    public OrderService: service.contract.OrderService,
                    public AlertService: service.contract.AlertService,
                    public NavigatorService:service.contract.NavigatorService) {
            super($scope, OrderService, AlertService, NavigatorService, "/order", "orderId");

            this.listEntity(0);
        }

    }
}

ControllerModule.controller("ListOrderController", controller.order.ListOrderController);
