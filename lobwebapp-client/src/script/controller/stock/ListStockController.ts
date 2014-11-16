///<reference path="../../reference.d.ts"/>
import enums = require("./../../util/EnumUtil");
import abstractListEntity = require("./../base/AbstractListEntityController");

export interface IListStockController extends abstractListEntity.IListEntityController<domain.Stock> {
}

export class ListStockController extends abstractListEntity.AbstractListEntityController<domain.Stock> implements IListStockController {
    static $inject = ["$scope", "StockService", "AlertService"];
    constructor(public $scope: controller.base.IAppScope,
        public StockService: service.contract.StockService,
        public AlertService: service.contract.AlertService) {
        super($scope, StockService, AlertService, "/stock", "stockId");

        this.listEntity(0);
    }

}