///<reference path="../../reference.d.ts"/>

import enumUtil = require("./../../util/EnumUtil");
import abstractListEntity = require("./../base/AbstractListEntityController");

export interface IListOrderController extends abstractListEntity.IListEntityController<domain.Order> {
}

export class ListOrderController extends abstractListEntity.AbstractListEntityController<domain.Order>{
    static $inject = ["$scope", "OrderService", "AlertService"];
    constructor(public $scope: controller.base.IAppScope,
                public OrderService: service.contract.OrderService,
                public AlertService: service.contract.AlertService) {
        super($scope, OrderService, AlertService, "/order", "orderId");

        this.listEntity(0);
    }

}