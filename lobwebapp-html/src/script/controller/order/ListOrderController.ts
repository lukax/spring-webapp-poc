///<reference path="../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");
import i0 = require("./../base/AbstractListEntityController");

export module controller.order {
    export interface IListOrderController extends i0.controller.base.IListEntityController<domain.Order> {
    }

    export class ListOrderController extends i0.controller.base.AbstractListEntityController<domain.Order>{
        static $inject = ["$scope", "OrderService", "AlertService"];
        constructor(public $scope: d.controller.base.IAppScope,
                    public OrderService: d.service.contract.OrderService,
                    public AlertService: d.service.contract.AlertService) {
            super($scope, OrderService, AlertService, "/order", "orderId");
            
            this.listEntity(0);
        }
        
    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("ListOrderController", controller.order.ListOrderController);
};