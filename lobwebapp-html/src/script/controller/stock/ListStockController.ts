///<reference path="../../reference.d.ts"/>

module controller.stock {
    export interface IListStockController extends controller.base.IListEntityController<domain.Stock>{
    }

    export class ListStockController extends controller.base.AbstractListEntityController<domain.Stock> implements IListStockController{
        static $inject = ["$scope", "StockService", "AlertService"];
        constructor(public $scope: controller.base.IAppScope,
                    public StockService: service.contract.StockService,
                    public AlertService: service.contract.AlertService) {
            super($scope, StockService, AlertService, "/stock", "stockId");
            
            this.listEntity(0);
        }

    }
}