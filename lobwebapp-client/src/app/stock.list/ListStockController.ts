///<reference path="../reference.ts"/>

module stock.list {
  export interface IListStockController extends core.IListEntityController<stock.Stock> {
  }

  export class ListStockController extends core.AbstractListEntityController<stock.Stock> implements IListStockController {
    static $inject = ["$scope", "StockService", "AlertService"];
    constructor(public $scope:core.IAppScope,
                public StockService:stock.StockService,
                public AlertService:core.AlertService,
                public NavigatorService:core.NavigatorService) {
      super($scope, StockService, AlertService, NavigatorService, "/stock", "stockId");

      this.listEntity(0);
    }

  }
}

stock.list.module.controller("ListStockController", stock.list.ListStockController);
