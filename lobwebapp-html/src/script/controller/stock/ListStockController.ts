///<reference path="./../../reference.d.ts"/>

import enums = require("./../../util/EnumUtil");
import i0 = require("./../base/AbstractListEntityController");

export module controller.stock {
    export interface ListStockViewModel extends i0.controller.base.ListEntityViewModel<domain.Stock>{
    }

    export class ListStockController extends i0.controller.base.AbstractListEntityController<domain.Stock>{
        static $inject = ["$scope", "StockService", "AlertService"];
        constructor(public $scope: ListStockViewModel,
                    public StockService: d.service.contract.StockService,
                    public AlertService: d.service.contract.AlertService) {
            super($scope, StockService, AlertService, "/stock/", "stockId");
            
            this.listEntity(0);
        }

    }
}

export var register = (moduleName: string) => {
    angular.module(moduleName).lazy.controller("ListStockController", controller.stock.ListStockController);
};