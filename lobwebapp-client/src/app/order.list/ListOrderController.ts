///<reference path="../reference.ts"/>

module order.list {
  export interface IListOrderController extends core.IListEntityController<order.Order> {
  }

  export class ListOrderController extends core.AbstractListEntityController<order.Order> {
    static $inject = ["$scope", "OrderService", "AlertService", "NavigatorService"];
    constructor(public $scope:core.IAppScope,
                public OrderService:order.OrderService,
                public AlertService:core.AlertService,
                public NavigatorService:core.NavigatorService) {
      super($scope, OrderService, AlertService, NavigatorService, "/order", "orderId");

      this.listEntity(0);
    }

  }
}

order.list.module.controller("ListOrderController", order.list.ListOrderController);
