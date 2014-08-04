///<reference path="../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");
import i0 = require("./../base/AbstractListEntityController");

export module controller.stock {
    export interface IListStockController extends i0.controller.base.IListEntityController<domain.Stock>{
    }

    export class ListStockController extends i0.controller.base.AbstractListEntityController<domain.Stock> implements IListStockController{
        static $inject = ["$scope", "StockService", "AlertService"];
        constructor(public $scope: d.controller.base.IAppScope,
                    public StockService: d.service.contract.StockService,
                    public AlertService: d.service.contract.AlertService) {
            super($scope, StockService, AlertService, "/stock", "stockId");

            this.listEntity(0);
        }

    }
}

export var register = (module: ng.ILazyModule) => {
  module.controller("ListStockController", controller.stock.ListStockController);
};
