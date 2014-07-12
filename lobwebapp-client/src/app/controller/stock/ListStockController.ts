///<reference path="../../reference.ts"/>

module controller.stock {
    export interface IListStockController extends controller.base.IListEntityController<domain.Stock>{
    }

    export class ListStockController extends controller.base.AbstractListEntityController<domain.Stock> implements IListStockController{

      static $inject = ["$scope", "StockService", "AlertService", "NavigatorService"];
        constructor(public $scope: controller.base.IAppScope,
                    public StockService: service.contract.StockService,
                    public AlertService: service.contract.AlertService,
                    public NavigatorService:service.contract.NavigatorService) {
            super($scope, StockService, AlertService, NavigatorService, "/stock", "stockId");

            this.listEntity(0);
        }

    }
}

ControllerModule.controller("ListStockController", controller.stock.ListStockController);
